CREATE VIEW `SimpleGameView` AS
SELECT
    id,
    name,
    description,
    imageUrl,
    avg_grade,
    min_players,
    max_players,
    min_play_time,
    max_play_time,
    quantity_available,
    min_age,
    max_age,
    category,
    price
FROM `BoardGames`;

CREATE VIEW `UsersSafe` AS
SELECT
    id,
    first_name,
    last_name,
    email,
    is_admin
FROM `Users`;

CREATE VIEW `FullCarts` AS
SELECT
    c.userId,
    c.quantity,
    g.*,
    CALCULATE_CART_PRICE (c.userId) total_price
FROM Carts c
    JOIN SimpleGameView g ON c.gameId = g.id;

CREATE VIEW ReviewsWithAuthors AS
SELECT r.*, u.first_name, u.last_name
FROM Reviews r
    JOIN Users u ON r.userId = u.id;

CREATE VIEW `FullOrders` AS
SELECT o.id as orderId, o.type, o.totalPrice, o.userId, o.createdAt, oi.quantity, oi.gameId, g.*
FROM
    `Orders` o
    JOIN `OrderItems` oi ON o.id = oi.orderId
    JOIN `SimpleGameView` g ON oi.gameId = g.id;

CREATE VIEW `LoanHistory` AS
SELECT
    o.createdAt,
    oi.orderId AS `OrderAssociated`,
    bg.name AS `GameName`,
    oi.quantity,
    l.max_return_date,
    l.actual_return_date,
    l.penalty
FROM
    `Orders` AS o
    JOIN `OrderItems` AS oi ON o.id = oi.orderId
    JOIN `Users` AS u ON o.userId = u.id
    JOIN `BoardGames` AS bg ON oi.gameId = bg.id
    JOIN `Loans` AS l ON o.id = l.orderId
WHERE
    o.type = 'rental'
ORDER BY o.createdAt DESC;