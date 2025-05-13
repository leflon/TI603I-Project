CREATE VIEW `SimpleGameView` AS
SELECT
    id,
    name,
    description,
    avg_grade,
    yearPublished,
    min_players,
    max_players,
    min_play_time,
    max_play_time,
    min_age,
    max_age,
    category,
    price
FROM `BoardGames`;

CREATE VIEW `CheapGames` AS
SELECT * FROM `SimpleGameView`
WHERE price < 15.0;


CREATE VIEW `GameForKids` AS
SELECT * FROM `SimpleGameView`
WHERE min_age IS NOT NULL AND min_age < 10;

CREATE VIEW `GameForTeens` AS
SELECT * FROM `SimpleGameView`
WHERE min_age IS NOT NULL AND min_age >= 10 AND min_age < 18;

CREATE VIEW `GameForAdults` AS
SELECT * FROM `SimpleGameView`
WHERE min_age IS NOT NULL AND min_age >= 18;


CREATE VIEW `LoanHistory` AS
SELECT
    o.createdAt,
    oi.orderId AS `OrderAssociated`,
    u.email,
    bg.name AS `GameName`,
    oi.quantity,
    l.max_return_date,
    l.actual_return_date,
    l.penalty
FROM `Orders` AS o
JOIN `OrderItems` AS oi ON o.id = oi.orderId
JOIN `Users` AS u ON o.userId = u.id
JOIN `BoardGames` AS bg ON oi.gameId = bg.id
JOIN `Loans` AS l ON o.id = l.orderId
WHERE o.type = 'rental'
ORDER BY o.createdAt DESC;


CREATE VIEW `HighGradeGames` AS
SELECT * FROM `SimpleGameView`
WHERE avg_grade IS NOT NULL AND avg_grade > 3.5;


CREATE VIEW `LowGradeGames` AS
SELECT * FROM `SimpleGameView`
WHERE avg_grade IS NOT NULL AND avg_grade <= 2;

