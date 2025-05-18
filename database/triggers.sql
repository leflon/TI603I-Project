-- Cannot insert order if quantity available = 0
DELIMITER $$

CREATE TRIGGER if_out_of_stock 
BEFORE INSERT ON OrderItems
FOR EACH ROW
BEGIN 
    DECLARE quantity SMALLINT;
    SELECT quantity_available INTO quantity
    FROM BoardGames
    WHERE id = NEW.gameId;

    IF quantity = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'You cannot order a game that is out of stock.';
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



-- Average is updated each time a new grade is given
DELIMITER $$
CREATE TRIGGER average_grade_update
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    DECLARE new_avg DECIMAL(3,2);

    SELECT AVG(grade) INTO new_avg
    FROM Reviews
    WHERE gameId = NEW.gameId;

    UPDATE BoardGames
    SET avg_grade = new_avg
    WHERE id = NEW.gameId;
END$$
DELIMITER ;