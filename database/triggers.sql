DELIMITER $$

CREATE TRIGGER email_check
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN 
    DECLARE email_exists INT;
    SELECT COUNT(*) INTO email_exists
    FROM Users
    WHERE email = NEW.email;
    IF email_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'This email is already being used.';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER stock_management 
BEFORE INSERT ON OrderItems
FOR EACH ROW
BEGIN 
    DECLARE quantity SMALLINT;
    DECLARE game_name VARCHAR(255);
    SELECT quantity_available INTO quantity
    FROM BoardGames
    WHERE id = NEW.gameId;

    IF NEW.quantity > quantity THEN
        SELECT g.name INTO game_name FROM SimpleGameView g WHERE g.id = NEW.gameId;
        SET @errormsg = CONCAT('We only have ', quantity, ' units of ', game_name, ' in stock. You cannot order ', NEW.quantity, '.');
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = @errormsg; 
            ELSE
                UPDATE BoardGames
                SET quantity_available = quantity_available - NEW.quantity
                WHERE id = NEW.gameId;
    END IF;
END$$

DELIMITER ;

-- Cannot insert a Grade if it's not between 0 and 5
DELIMITER $$

CREATE TRIGGER grade_check
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN 
    IF NEW.grade <  0 OR NEW.grade > 5 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Your rating must be between 0 and 5.';
    END IF;
END$$

DELIMITER ;

-- Cannot insert a Review if an order has not been made
DELIMITER $$

CREATE TRIGGER review_check
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN
    DECLARE order_exists BOOLEAN;

    SELECT EXISTS (
        SELECT 1
        FROM Orders o
        JOIN OrderItems oi ON o.id = oi.orderId
        WHERE o.userId = NEW.userId AND oi.gameId = NEW.gameId
    ) INTO order_exists;

    IF NOT order_exists THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'You cannot review a game you have not ordered.';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE UPDATE_AVG_GRADE_FOR_GAME(IN p_gameId CHAR(8))
BEGIN
    DECLARE new_avg DECIMAL(3,2);
    SELECT AVG(grade) INTO new_avg
    FROM Reviews
    WHERE gameId = p_gameId;

    UPDATE BoardGames
    SET avg_grade = new_avg
    WHERE id = p_gameId;
END$$

DELIMITER ;

-- Average is updated each time a new grade is given
DELIMITER $$

CREATE TRIGGER average_grade_update
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    CALL UPDATE_AVG_GRADE_FOR_GAME(NEW.gameId);
END$$

DELIMITER ;
-- Average is updated each time a grade is updated
DELIMITER $$

CREATE TRIGGER average_grade_update_update
AFTER UPDATE ON Reviews
FOR EACH ROW
BEGIN
    CALL UPDATE_AVG_GRADE_FOR_GAME(NEW.gameId);
END$$

DELIMITER ;
-- Average is updated each time a grade is deleted
DELIMITER $$

CREATE TRIGGER average_grade_update_delete
AFTER DELETE ON Reviews
FOR EACH ROW
BEGIN
    CALL UPDATE_AVG_GRADE_FOR_GAME(OLD.gameId);
END$$

DELIMITER ;