INSERT INTO `Users` (id, first_name, surname, username, email, password_hash, is_admin)
VALUES 
('U0000001', 'Alice', 'Smith', 'alice123', 'alice@example.com', 'hashed_password_1', FALSE),
('U0000002', 'Bob', 'Jones', 'bobby', 'bob@example.com', 'hashed_password_2', TRUE),
('U0000003', 'Charlie', 'Brown', 'charlie_b', 'charlie@example.com', 'hashed_password_3', FALSE),
('U0000004', 'Dana', 'White', 'danaw', 'dana@example.com', 'hashed_password_4', FALSE);


INSERT INTO `BoardGames` (
    id, name, price, description, yearPublished, min_players, max_players, min_play_time, max_play_time,
    min_age, max_age, quantity_available, quantity_lent, category,
    family, implementations, designers, artists, publishers, mechanics, expansions
)
VALUES 
('G0000001', 'Carcassonne', 29.99, 'Tile-placement game where players build medieval landscapes.', 2000, 2, 5, 35, 45, 7, 99, 8, 2, 'Strategy',
    '["Carcassonne Series"]', '["Carcassonne Big Box"]', '["Klaus-Jürgen Wrede"]', '["Doris Matthäus"]', '["Hans im Glück"]', '["Tile Placement"]', '["Inns & Cathedrals"]'),

('G0000002', 'Gloomhaven', 119.99, 'Epic campaign game with tactical combat and evolving narrative.', 2017, 1, 4, 90, 150, 14, 99, 3, 1, 'Adventure',
    '["Gloomhaven Universe"]', '["Gloomhaven: Jaws of the Lion"]', '["Isaac Childres"]', '["Alexandr Elichev"]', '["Cephalofair Games"]', '["Hand Management", "Cooperative Play"]', '["Forgotten Circles"]'),

('G0000003', 'Ticket to Ride', 44.99, 'Collect train cards to claim railway routes across North America.', 2004, 2, 5, 30, 60, 8, 99, 9, 0, 'Family',
    '["Ticket to Ride Series"]', '["Ticket to Ride: Europe"]', '["Alan R. Moon"]', '["Julien Delval"]', '["Days of Wonder"]', '["Set Collection", "Route Building"]', '["Ticket to Ride: 1910"]'),

('G0000004', '7 Wonders', 34.99, 'Draft cards to build a civilization and wonders.', 2010, 2, 7, 30, 30, 10, 99, 6, 1, 'Civilization',
    '["7 Wonders Series"]', '["7 Wonders: Duel"]', '["Antoine Bauza"]', '["Miguel Coimbra"]', '["Repos Production"]', '["Card Drafting"]', '["7 Wonders: Leaders"]'),

('G0000005', 'Azul', 29.99, 'Pattern-building game inspired by Portuguese tiles.', 2017, 2, 4, 30, 45, 8, 99, 5, 0, 'Abstract',
    '["Azul Series"]', '["Azul: Stained Glass of Sintra"]', '["Michael Kiesling"]', '["Chris Quilliams"]', '["Plan B Games"]', '["Pattern Building"]', '["Azul: Summer Pavilion"]'),

('G0000006', 'Dominion', 39.99, 'Deck-building game where you acquire cards to gain victory points.', 2008, 2, 4, 30, 45, 13, 99, 4, 1, 'Card Game',
    '["Dominion Series"]', '["Dominion: Intrigue"]', '["Donald X. Vaccarino"]', '["Various"]', '["Rio Grande Games"]', '["Deck Building"]', '["Seaside", "Prosperity"]'),

('G0000007', 'Exploding Kittens', 19.99, 'Fast-paced card game about kittens and explosions.', 2015, 2, 5, 10, 15, 7, 99, 12, 1, 'Party',
    '["Exploding Kittens Series"]', '["NSFW Edition"]', '["Elan Lee", "Matthew Inman"]', '["Matthew Inman"]', '["Exploding Kittens LLC"]', '["Push Your Luck"]', '["Barking Kittens"]'),

('G0000008', 'Root', 59.99, 'Asymmetric war game in a woodland setting.', 2018, 2, 4, 60, 90, 10, 99, 4, 1, 'Wargame',
    '["Root Series"]', '["Root: The Riverfolk Expansion"]', '["Cole Wehrle"]', '["Kyle Ferrin"]', '["Leder Games"]', '["Area Control", "Asymmetric"]', '["Underworld Expansion"]');


INSERT INTO `Reviews` (id, userId, gameId, description, grade, createdAt) 
VALUES 
('R0000001', 'U0000001', 'B0000001', 'A timeless classic, never gets old.', 10, '2024-04-01 10:00:00'),
('R0000002', 'U0000002', 'B0000002', 'Really fun with friends, love the trading.', 9, '2024-04-05 14:30:00'),
('R0000003', 'U0000003', 'B0000003', 'Gets repetitive quickly.', 6, '2024-04-10 12:00:00'),
('R0000004', 'U0000004', 'B0000004', 'Challenging and exciting game!', 8, '2024-04-15 11:45:00');


INSERT INTO `Wishlists` (gameId, userId)
VALUES 
('G0000002', 'U0000001'),
('G0000003', 'U0000002'),
('G0000001', 'U0000003'),
('G0000004', 'U0000004');


INSERT INTO `Carts` (gameId, userId, quantity)
VALUES 
('G0000002', 'U0000001', 1),
('G0000003', 'U0000002', 2),
('G0000001', 'U0000003', 1),
('G0000004', 'U0000004', 1);


INSERT INTO `Orders` (id, type, totalPrice, userId, createdAt)
VALUES 
('O0000001', 'purchase', 39.99, 'U0000001', '2024-04-10 16:00:00'),
('O0000002', 'rental', 5.00, 'U0000002', '2024-04-12 09:00:00'),
('O0000003', 'purchase', 59.99, 'U0000003', '2024-04-18 18:30:00'),
('O0000004', 'rental', 7.50, 'U0000004', '2024-04-20 14:00:00');


INSERT INTO `OrderItems` (orderId, gameId, quantity)
VALUES 
('O0000001', 'G0000002', 1),
('O0000002', 'G0000003', 1),
('O0000003', 'G0000001', 1),
('O0000003', 'G0000004', 1),
('O0000004', 'G0000004', 1);


INSERT INTO `Loans` (id, max_return_date, actual_return_date, penalty, orderId)
VALUES 
('L0000001', '2024-04-22', '2024-04-20', 0, 'O0000002'),
('L0000002', '2024-04-30', NULL, 0, 'O0000004');
