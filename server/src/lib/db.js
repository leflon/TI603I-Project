import mysql from 'mysql2/promise';
import bcrypt, {compareSync, hashSync} from 'bcryptjs';
import {isValidEmail, isValidPassword} from './utils.js';

const connection = await mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
});

export default connection;

// #region User
/**
 * Creates a new user in the database.
 *
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The surname of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The plaintext password of the user.
 * @throws {Error} If the provided email is invalid.
 * @throws {Error} If a user with the provided email already exists.
 * @throws {Error} If the provided password does not meet the requirements.
 * @throws {Error} If any of the first_name, surname, or username is empty.
 * @returns {Promise<string>} The ID of the newly created user.
 */
export async function createUser(first_name, last_name, email, password) {
	if (!isValidEmail(email))
		throw new Error("Provided email is invalid");

	let results = await connection.query(
		'SELECT * FROM users WHERE email = ?',
		[email]
	);
	if (!results.length)
		throw new Error(`'${results.email}' is already in use.`);

	if (!isValidPassword(password))
		throw new Error('Provided password does not match requirements.');

	const password_hash = hashSync(password, 10);
	await connection.query(
		"INSERT INTO Users VALUES (ID(), ?, ?, ?, ?, 0)",
		[first_name, last_name, email, password_hash]
	);
	results = await connection.query(
		"SELECT id FROM Users WHERE email = ?",
		[email]
	);
	return results[0].id;
}


/**
 * Verifies user credentials against the database records.
 * @param {string} email - The email address of the user to authenticate.
 * @param {string} password - The plaintext password provided by the user.
 * @returns {Promise<string | null>} User ID if credentials are valid, null otherwise.
 * @throws {Error} If no user is found with the provided email.
 * @throws {Error} If more than one user is associated with the provided email.
 */
export async function checkUserCredentials(email, password) {
	const [results] = await connection.query(
		"SELECT id, password_hash FROM Users WHERE email = ?",
		[email]
	);
	if (!results.length) return null;
	if (results.length > 1) return null;
	return compareSync(password, results[0].password_hash) ? results[0].id : null;
}

export async function getUserByID(userID) {
	const [results] = await connection.query(
		"SELECT * FROM users WHERE id = ?",
		[userID]
	);
	if (!results.length)
		throw new Error(`No user found with this id '${userID}'`);

	return results[0];
}

/**
 * Finds a user by their ID and deletes them from the users table
 * @param {string} userID
 * @returns {void} nothing is returned by the function
 */
export async function deleteUserByID(userID) {
	const [results] = await connection.query(
		"DELETE FROM users WHERE id = ?",
		[userID]
	);

	if (!results.affectedRows)
		throw new Error(`No user has this id '${userID}'`);
}



// #endregion

// #region Games
export async function getAllGames() {
	const [results] = await connection.query("SELECT id, name FROM BoardGames");
	return results;
}
export async function getGame(gameId) {
	let [results] = await connection.query(
		"SELECT * FROM boardgames WHERE id = ?",
		[gameId]
	);

	if (!results.length)
		throw new Error(`No game found with this id '${gameId}'`);

	return results[0];
}

export async function getAllCategories(limit = 10) {
	if (isNaN(limit) || limit < 0)
		limit = 10;
	let [results] = await connection.query(
		`SELECT DISTINCT category FROM BoardGames LIMIT ${limit}`
	);
	return results.map((e) => e.category);
}

export async function searchGames({
	name = "",
	category = '',
	minPlayers = 0,
	maxPlayers = 100,
	minPlayTime = 0,
	maxPlayTime = 10000,
	minAge = 0,
	maxAge = 100,
	minPrice = 0,
	maxPrice = 10000,
	limit = 10
} = {}) {
	// Preventing SQL injection since this value is directly concaténated in the query
	if (isNaN(limit) || limit < 0)
		limit = 10;
	const query = `
		SELECT * FROM BoardGames
		WHERE
			name LIKE ?
			AND category LIKE ?
			AND min_players >= ?
			AND max_players <= ?
			AND min_play_time >= ?
			AND max_play_time <= ?
			AND min_age >= ?
			AND max_age <= ?
			AND price >= ?
			AND price <= ?
		LIMIT ${limit}
	`;
	const params = [
		`%${name}%`,
		`%${category}%`,
		minPlayers,
		maxPlayers,
		minPlayTime,
		maxPlayTime,
		minAge,
		maxAge,
		minPrice,
		maxPrice
	];
	const [results] = await connection.query(query, params);
	return results;
}

export async function getBestSellers() {
	let [results] = await connection.query(
		"SELECT * FROM boardgames ORDER BY GAME_ORDERS_COUNT(id) DESC LIMIT 5"
	);
	return results;
}


export async function getGameQuantity(gameId) {
	let [boardgameAvailableQuantity] = await connection.query("SELECT quantity_available FROM boardgames WHERE id = ?",
		[gameId]
	);
	if (!boardgameAvailableQuantity.length)
		throw new Error(`Game not found`);

	return boardgameAvailableQuantity[0].quantity_available;
}
export async function decreaseGameQuantity(boardgameID, quantity) {
	let availableQuantity = await getGameQuantity(boardgameID);

	if (quantity > availableQuantity) {
		throw Error(`Not enough stock (${availableQuantity} available)`);
	}
	connection.query(
		"UPDATE boardgames SET quantity_available = ? WHERE id = ?;",
		[availableQuantity - quantity, boardgameID]
	);
}
// #endregion

// #region Carts
export async function getUserCart(userID) {
	const [results] = await connection.query(
		"SELECT c.quantity, g.* FROM carts c JOIN BoardGames g ON c.gameId = g.id WHERE userId = ?",
		[userID]
	);

	let answer = {};
	results.forEach((e) => {
		answer[e.id] = e;
	});

	return answer;
}

export async function addItemToCart(userID, gameId, quantity) {
	const stock = await getGameQuantity(gameId);
	if (quantity > stock)
		throw new Error(`Not enough of '${gameId}' in stock (${stock} available)`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [gameId]
	);
	if (!gameExists.length)
		throw Error(`No game with id '${gameId}' in database`);

	let [alreadyInCart] = await connection.query(
		"SELECT quantity from carts WHERE gameId = ? AND userId = ?",
		[gameId, userID]
	);
	alreadyInCart = alreadyInCart.length ? alreadyInCart[0].quantity : 0;
	let newQuantity = quantity + alreadyInCart;

	if (alreadyInCart) {
		let [results] = await connection.query(
			"UPDATE carts SET quantity = ? WHERE userId = ? AND gameId = ?",
			[newQuantity, userID, gameId]
		);
	}
	else {
		let [results] = await connection.query(
			"INSERT INTO carts VALUES (?, ?, ?)",
			[gameId, userID, newQuantity]
		);
	}
	console.log(`Added ${quantity} of '${gameId}' to user '${userID}' cart (Remaining stock: ${stock - quantity})`);
	await decreaseGameQuantity(gameId, quantity);
}

export async function removeItemFromCart(userId, gameId) {
	let [rows] = await connection.query("SELECT quantity from carts WHERE userId = ? AND gameId = ?", [userId, gameId]);
	if (!rows.length)
		throw new Error(`Product not found in user's cart`);

	const quantity = rows[0].quantity;

	let [results] = await connection.query(
		"DELETE FROM carts WHERE gameId = ? AND userId = ?",
		[gameId, userId]
	);

	await decreaseGameQuantity(gameId, -quantity);

	console.log(`Removed '${gameId}' from user '${userId}' cart (Added back ${quantity} to stock)`);
}


// #endregion



export async function getWishlistByUserID(userID) {
	if (!userID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}'`);
	const [results] = await connection.query("SELECT gameId from wishlists WHERE userId = ?", [userID]);

	let answer = [];
	results.forEach((e) => {
		answer.push(e.gameId);
	});

	return answer;

}
export async function addItemToWishlist(userID, boardgameID) {
	if (!userID.length || !boardgameID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}', boardgameID='${boardgameID}'`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [boardgameID]
	);
	if (!gameExists.length)
		throw Error(`No game with id '${boardgameID}' in database`);

	let [gameInWishlist] = await connection.query(
		"SELECT gameId from wishlists WHERE gameId = ? AND userId = ?",
		[boardgameID, userID]
	);
	if (gameInWishlist.length) {
		console.log(`Game '${boardgameID}' is already in user '${userID}'s wishlist !`);
		return;
	}

	let [results] = await connection.query(
		"INSERT INTO wishlists VALUES (?, ?)",
		[boardgameID, userID]
	);

	return `Successfully added game '${boardgameID}' to user '${userID}'s wishlist`;

}
export async function removeItemFromWishlist(userID, boardgameID) {
	if (!userID.length || !boardgameID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}', boardgameID='${boardgameID}'`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [boardgameID]
	);
	if (!gameExists.length)
		throw Error(`No game with id '${boardgameID}' in database`);

	const [results] = await connection.query(
		"DELETE FROM wishlists WHERE gameId = ? AND userId = ?",
		[boardgameID, userID]
	);
	return `Successfully deleted '${boardgameID}' from '${userID}'s wishlist`;


}
export async function getOrderByUserID(userID) {
	const [results] = connection.query(
		"SELECT * FROM orders WHERE userId = ?", [userID]
	);
	return results;
}

