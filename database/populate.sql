INSERT INTO `Users` (id, first_name, last_name, email, password_hash, is_admin)
VALUES 
('U0000001', 'Alice', 'Smith', 'alice@example.com', 'hashed_password_1', FALSE),
('U0000002', 'Bob', 'Jones', 'bob@example.com', 'hashed_password_2', TRUE),
('U0000003', 'Charlie', 'Brown', 'charlie@example.com', 'hashed_password_3', FALSE),
('U0000004', 'Dana', 'White', 'dana@example.com', 'hashed_password_4', FALSE);


INSERT INTO `BoardGames` (
    id, name, price, description, yearPublished, avg_grade, min_players, max_players, min_play_time, max_play_time,
    min_age, max_age, quantity_available, quantity_lent, category,
    family, implementations, designers, artists, publishers, mechanics, expansions
)
VALUES
('G0000001', 'Carcassonne', 29.99, 'Tile-placement game where players build medieval landscapes.', 2000, NULL, 2, 5, 35, 45, 7, 99, 8, 2, 'Strategy',
    '["Carcassonne Series"]', '["Carcassonne Big Box"]', '["Klaus-Jürgen Wrede"]', '["Doris Matthäus"]', '["Hans im Glück"]', '["Tile Placement"]', '["Inns & Cathedrals"]'),

('G0000002', 'Gloomhaven', 119.99, 'Epic campaign game with tactical combat and evolving narrative.', 2017, NULL, 1, 4, 90, 150, 14, 99, 3, 1, 'Adventure',
    '["Gloomhaven Universe"]', '["Gloomhaven: Jaws of the Lion"]', '["Isaac Childres"]', '["Alexandr Elichev"]', '["Cephalofair Games"]', '["Hand Management", "Cooperative Play"]', '["Forgotten Circles"]'),

('G0000003', 'Ticket to Ride', 44.99, 'Collect train cards to claim railway routes across North America.', 2004, NULL, 2, 5, 30, 60, 8, 99, 9, 0, 'Family',
    '["Ticket to Ride Series"]', '["Ticket to Ride: Europe"]', '["Alan R. Moon"]', '["Julien Delval"]', '["Days of Wonder"]', '["Set Collection", "Route Building"]', '["Ticket to Ride: 1910"]'),

('G0000004', '7 Wonders', 34.99, 'Draft cards to build a civilization and wonders.', 2010, NULL, 2, 7, 30, 30, 10, 99, 6, 1, 'Civilization',
    '["7 Wonders Series"]', '["7 Wonders: Duel"]', '["Antoine Bauza"]', '["Miguel Coimbra"]', '["Repos Production"]', '["Card Drafting"]', '["7 Wonders: Leaders"]'),

('G0000005', 'Azul', 29.99, 'Pattern-building game inspired by Portuguese tiles.', 2017, NULL, 2, 4, 30, 45, 8, 99, 5, 0, 'Abstract',
    '["Azul Series"]', '["Azul: Stained Glass of Sintra"]', '["Michael Kiesling"]', '["Chris Quilliams"]', '["Plan B Games"]', '["Pattern Building"]', '["Azul: Summer Pavilion"]'),

('G0000006', 'Dominion', 39.99, 'Deck-building game where you acquire cards to gain victory points.', 2008, NULL, 2, 4, 30, 45, 13, 99, 4, 1, 'Card Game',
    '["Dominion Series"]', '["Dominion: Intrigue"]', '["Donald X. Vaccarino"]', '["Various"]', '["Rio Grande Games"]', '["Deck Building"]', '["Seaside", "Prosperity"]'),

('G0000007', 'Exploding Kittens', 19.99, 'Fast-paced card game about kittens and explosions.', 2015, NULL, 2, 5, 10, 15, 7, 99, 12, 1, 'Party',
    '["Exploding Kittens Series"]', '["NSFW Edition"]', '["Elan Lee", "Matthew Inman"]', '["Matthew Inman"]', '["Exploding Kittens LLC"]', '["Push Your Luck"]', '["Barking Kittens"]'),

('G0000008', 'Root', 59.99, 'Asymmetric war game in a woodland setting.', 2018, NULL, 2, 4, 60, 90, 10, 99, 4, 1, 'Wargame',
    '["Root Series"]', '["Root: The Riverfolk Expansion"]', '["Cole Wehrle"]', '["Kyle Ferrin"]', '["Leder Games"]', '["Area Control", "Asymmetric"]', '["Underworld Expansion"]'),

('G0000009', 'Wow', 7.99, 'Cards game where you select the best course of action.', 2025, NULL, 3, 6, 30, 120, 18, 99, 3, 0, 'Party',
    '["Coline"]', '["Coline: Around a Glass"]', '["Olivier S. Fondas"]', '["Mom Colin"]', '["Mallemort"]', '["Card Drafting"]', '["Rave Expansion"]'),

('G0000010', 'Codenames', 24.99, 'Spy-themed word game where players guess secret words.', 2015, NULL, 2, 8, 15, 30, 14, 99, 7, 1, 'Party',
    '["Codenames Series"]', '["Codenames: Duet"]', '["Vlaada Chvátil"]', '["Tomáš Kučerovský"]', '["Czech Games Edition"]', '["Word Game", "Team-Based"]', '["Codenames: Pictures"]'),

('G0000011', 'Wingspan', 54.99, 'Engine-building game with birds and unique powers.', 2019, NULL, 1, 5, 40, 70, 10, 99, 6, 0, 'Strategy',
    '["Wingspan Series"]', '["Wingspan: Oceania Expansion"]', '["Elizabeth Hargrave"]', '["Natalia Rojas", "Ana Maria Martinez"]', '["Stonemaier Games"]', '["Engine Building"]', '["Wingspan: European Expansion"]'),

('G0000012', 'Pandemic', 39.99, 'Co-op game to stop global disease outbreaks.', 2008, NULL, 2, 4, 45, 60, 8, 99, 10, 2, 'Cooperative',
    '["Pandemic Series"]', '["Pandemic: Legacy Season 1"]', '["Matt Leacock"]', '["Josh Cappel"]', '["Z-Man Games"]', '["Cooperative Play"]', '["On the Brink"]'),

('G0000013', 'Catan', 49.99, 'Trade and build settlements on a modular board.', 1995,NULL, 3, 4, 60, 120, 10, 99, 11, 2, 'Strategy',
    '["Catan Series"]', '["Catan: Seafarers"]', '["Klaus Teuber"]', '["Volkan Baga"]', '["Kosmos", "Catan Studio"]', '["Trading", "Dice Rolling"]', '["Catan: Cities & Knights"]'),

('G0000014', 'Scythe', 89.99, 'Alternate-history engine builder with combat and farming.', 2016, NULL, 1, 5, 90, 115, 14, 99, 5, 1, 'Wargame',
    '["Scythe Universe"]', '["Scythe: The Rise of Fenris"]', '["Jamey Stegmaier"]', '["Jakub Rozalski"]', '["Stonemaier Games"]', '["Engine Building", "Area Control"]', '["Invaders from Afar"]'),

('G0000015', 'The Crew', 14.99, 'Cooperative trick-taking mission game in space.', 2019, NULL, 2, 5, 20, 30, 10, 99, 7, 0, 'Cooperative',
    '["The Crew Series"]', '["The Crew: Mission Deep Sea"]', '["Thomas Sing"]', '["Marco Armbruster"]', '["Kosmos"]', '["Trick Taking"]', '["New Missions"]');



INSERT INTO `Reviews` (id, userId, gameId, description, grade, createdAt) 
VALUES 
('R0000001', 'U0000001', 'G0000001', 'A timeless classic, never gets old.', 3, '2024-04-01 10:00:00'),
('R0000002', 'U0000002', 'G0000002', 'Really fun with friends, love the trading.', 1, '2024-04-05 14:30:00'),
('R0000003', 'U0000003', 'G0000003', 'Gets repetitive quickly.', 4, '2024-04-10 12:00:00'),
('R0000004', 'U0000004', 'G0000004', 'Challenging and exciting game!', 4, '2024-04-15 11:45:00'),
('R0000005', 'U0000004', 'G0000009', 'Repetitive cards.', 2, '2025-01-16 11:32:00'),
('R0000006', 'U0000001', 'G0000002', 'Too long for casual nights.', 3, '2024-05-01 10:00:00'),
('R0000007', 'U0000002', 'G0000003', 'Great intro game for new players.', 4, '2024-05-02 10:30:00'),
('R0000008', 'U0000003', 'G0000001', 'Fun with kids, easy to teach.', 4, '2024-05-03 11:00:00'),
('R0000009', 'U0000004', 'G0000005', 'Beautiful and relaxing.', 5, '2024-05-04 09:15:00'),
('R0000010', 'U0000001', 'G0000010', 'Best party game!', 5, '2024-05-05 17:00:00'),
('R0000011', 'U0000002', 'G0000006', 'Strategic and replayable.', 4, '2024-05-06 18:00:00'),
('R0000012', 'U0000003', 'G0000007', 'Silly and quick.', 3, '2024-05-07 12:30:00'),
('R0000013', 'U0000004', 'G0000008', 'Asymmetric mechanics are great.', 5, '2024-05-08 14:00:00'),
('R0000014', 'U0000001', 'G0000011', 'Soothing and clever mechanics.', 4, '2024-05-09 15:00:00'),
('R0000015', 'U0000002', 'G0000012', 'Team play makes it fun!', 4, '2024-05-10 13:00:00'),
('R0000016', 'U0000003', 'G0000013', 'Great for competitive players.', 4, '2024-05-11 11:20:00'),
('R0000017', 'U0000004', 'G0000014', 'Epic and beautifully designed.', 5, '2024-05-12 12:10:00'),
('R0000018', 'U0000001', 'G0000015', 'Short and sweet.', 4, '2024-05-13 10:00:00'),
('R0000019', 'U0000002', 'G0000004', 'Nice drafting game.', 3, '2024-05-14 16:40:00'),
('R0000020', 'U0000003', 'G0000009', 'Not very innovative.', 2, '2024-05-15 08:45:00');

UPDATE `BoardGames` SET avg_grade = 3.5 WHERE id = 'G0000001'; -- (3 + 4) / 2
UPDATE `BoardGames` SET avg_grade = 2.0 WHERE id = 'G0000002'; -- (1 + 3) / 2
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000003'; -- (4 + 4) / 2
UPDATE `BoardGames` SET avg_grade = 3.5 WHERE id = 'G0000004'; -- (4 + 3) / 2
UPDATE `BoardGames` SET avg_grade = 5.0 WHERE id = 'G0000005'; -- 5
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000006'; -- 4
UPDATE `BoardGames` SET avg_grade = 3.0 WHERE id = 'G0000007'; -- 3
UPDATE `BoardGames` SET avg_grade = 5.0 WHERE id = 'G0000008'; -- 5
UPDATE `BoardGames` SET avg_grade = 2.0 WHERE id = 'G0000009'; -- (2 + 2) / 2
UPDATE `BoardGames` SET avg_grade = 5.0 WHERE id = 'G0000010'; -- 5
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000011'; -- 4
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000012'; -- 4
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000013'; -- 4
UPDATE `BoardGames` SET avg_grade = 5.0 WHERE id = 'G0000014'; -- 5
UPDATE `BoardGames` SET avg_grade = 4.0 WHERE id = 'G0000015'; -- 4



INSERT INTO `Wishlists` (gameId, userId) VALUES
('G0000002', 'U0000001'),
('G0000003', 'U0000002'),
('G0000001', 'U0000003'),
('G0000004', 'U0000004'),
('G0000011', 'U0000002'),
('G0000011', 'U0000004'),
('G0000012', 'U0000001'),
('G0000008', 'U0000003'),
('G0000015', 'U0000003'),
('G0000009', 'U0000001'),
('G0000014', 'U0000004'),
('G0000002', 'U0000002');



INSERT INTO `Carts` (gameId, userId, quantity) VALUES
('G0000002', 'U0000001', 1),
('G0000003', 'U0000002', 2),
('G0000001', 'U0000003', 1),
('G0000005', 'U0000002', 1),
('G0000006', 'U0000001', 1),
('G0000014', 'U0000001', 3),
('G0000014', 'U0000003', 3),
('G0000002', 'U0000003', 3),
('G0000002', 'U0000004', 3),
('G0000004', 'U0000004', 2),
('G0000015', 'U0000001', 1);



INSERT INTO `Orders` (id, type, totalPrice, userId, createdAt) VALUES
('O0000001', 'purchase', 39.99, 'U0000001', '2024-04-10 16:00:00'),
('O0000002', 'rental', 5.00, 'U0000002', '2024-04-12 09:00:00'),
('O0000003', 'purchase', 59.99, 'U0000003', '2024-04-18 18:30:00'),
('O0000004', 'rental', 7.50, 'U0000004', '2024-04-20 14:00:00'),
('O0000006', 'rental', 13.13, 'U0000004', '2024-04-22 01:00:00'),
('O0000007', 'rental', 93.89, 'U0000004', '2024-04-12 06:00:00'),
('O0000008', 'purchase', 37.82, 'U0000003', '2024-04-26 16:00:00'),
('O0000009', 'purchase', 28.96, 'U0000003', '2024-04-26 11:00:00'),
('O0000010', 'rental', 32.48, 'U0000001', '2024-04-26 22:00:00'),
('O0000011', 'rental', 56.82, 'U0000001', '2024-04-21 13:00:00'),
('O0000012', 'rental', 51.36, 'U0000003', '2024-04-12 07:00:00'),
('O0000013', 'purchase', 44.61, 'U0000002', '2024-04-21 08:00:00');



INSERT INTO `OrderItems` (orderId, gameId, quantity) VALUES
('O0000001', 'G0000002', 1),
('O0000002', 'G0000003', 1),
('O0000003', 'G0000001', 1),
('O0000003', 'G0000004', 1),
('O0000004', 'G0000004', 1),
('O0000006', 'G0000009', 1),
('O0000007', 'G0000014', 2),
('O0000008', 'G0000015', 2),
('O0000009', 'G0000011', 2),
('O0000010', 'G0000005', 2),
('O0000011', 'G0000014', 1),
('O0000012', 'G0000007', 1),
('O0000013', 'G0000015', 1);



INSERT INTO `Loans` (id, max_return_date, actual_return_date, penalty, orderId) VALUES
('L0000001', '2024-04-22', '2024-04-20', 0, 'O0000002'),
('L0000002', '2024-04-30', NULL, 0, 'O0000004'),
('L0000003', '2024-05-02', NULL, 0, 'O0000006'),
('L0000004', '2024-04-22', '2024-05-18', 2.5, 'O0000007'),
('L0000005', '2024-05-06', '2024-05-06', 0, 'O0000010'),
('L0000006', '2024-05-01', NULL, 0, 'O0000011'),
('L0000007', '2024-04-22', NULL, 0, 'O0000012');


