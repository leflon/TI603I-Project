-- Cannot insert order if quantity available = 0
DELIMITER $$

CREATE TRIGGER if_out_of_stock 
BEFORE INSERT ON OrderItems
FOR EACH ROW
BEGIN 
    DECLARE quantity SMALLINT;
    SELECT quantity_available INTO quantity
    FROM BoardGames
    WHERE id = NEW.gameID;

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
    DECLARE orderId CHAR(8);
    SELECT id INTO orderId
    FROM Orders
    WHERE userId = NEW.userId AND gameId = NEW.gameId;

    IF orderId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'You cannot review a game you have not ordered it.';
    END IF;
END$$
DELIMITER ;