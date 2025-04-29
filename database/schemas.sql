DROP TABLE IF EXISTS `Reviews`;
DROP TABLE IF EXISTS `Wishlists`;
DROP TABLE IF EXISTS `Carts`;
DROP TABLE IF EXISTS `OrderItems`;
DROP TABLE IF EXISTS `Loans`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `BoardGames`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE IF NOT EXISTS `Users`(
	id CHAR(8) PRIMARY KEY,
	first_name VARCHAR(255),
	surname VARCHAR(255),
	username VARCHAR(32),
	email VARCHAR(255),
	password_hash CHAR(60),
	is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS `BoardGames`(
	id CHAR(8) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	description TEXT NOT NULL,
	-- Not using YEAR because it only stores from year 1901. Some games were created way before that, even in the BC era, hence using a signed type.
	yearPublished SMALLINT,
	min_players TINYINT UNSIGNED,
	max_players TINYINT UNSIGNED,
	min_play_time TINYINT UNSIGNED, -- In minutes
	max_play_time TINYINT UNSIGNED, -- In minutes
	min_age TINYINT UNSIGNED,
	max_age TINYINT UNSIGNED,
	quantity_available SMALLINT UNSIGNED NOT NULL,
	quantity_lent SMALLINT UNSIGNED,
	category VARCHAR(255), -- We only keep the first category given to each game for simplification
	-- The following columns, even though they are arrays, will be considered atomic.
	-- This data will merely be displayed on the game's product page, but we perform no operation on it whatsoever.
	-- Making a new table for each of these columns will not be worth the complexity. 
	family JSON,
	implementations JSON,
	designers JSON,
	artists JSON,
	publishers JSON,
	mechanics JSON,
	-- The expansions are only stored by name, not id, so we wouldn't even be
    -- able to use it to redirect the users to the corresponding pages.
	-- Hence, it will also be considered basically atomic.
	expansions JSON
);

CREATE TABLE IF NOT EXISTS `Reviews`(
	id CHAR(8) PRIMARY KEY,
	userId CHAR(8) NOT NULL,
	gameId CHAR(8) NOT NULL,
	description TEXT,
	grade TINYINT UNSIGNED NOT NULL,
	createdAt DATETIME,
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)
);

CREATE TABLE IF NOT EXISTS `Wishlists`(
	gameId CHAR(8) NOT NULL,
	userId CHAR(8) NOT NULL,
	PRIMARY KEY (gameId, userId),
	FOREIGN KEY (`gameId`) REFERENCES `BoardGames`(`id`),
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)
);

CREATE TABLE IF NOT EXISTS `Carts`(
	gameId CHAR(8),
	userId CHAR(8),
	quantity SMALLINT UNSIGNED,
	PRIMARY KEY (gameId, userId),
	FOREIGN KEY (`gameId`) REFERENCES `BoardGames`(`id`),
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)
);

CREATE TABLE IF NOT EXISTS `Orders`(
	id CHAR(8) PRIMARY KEY, 
	type ENUM('purchase', 'rental'),
	totalPrice DECIMAL(10,2),
	userId CHAR(8) NOT NULL,
	createdAt DATETIME,
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)
);


CREATE TABLE IF NOT EXISTS `OrderItems`(
	orderId CHAR(8),
	gameId CHAR(8),
	quantity SMALLINT UNSIGNED NOT NULL,
	PRIMARY KEY (orderId, gameId),
	FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`),
	FOREIGN KEY (`gameId`) REFERENCES `BoardGames`(`id`)
);

CREATE TABLE IF NOT EXISTS `Loans`(
	id CHAR(8) PRIMARY KEY,
	max_return_date DATE NOT NULL,
	actual_return_date DATE,
	penalty SMALLINT UNSIGNED,
	orderId CHAR(8) NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`)
);