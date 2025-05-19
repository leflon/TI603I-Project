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

	if (!isValidPassword(password))
		throw new Error('Provided password does not match requirements.');

	const password_hash = hashSync(password, 10);
	await connection.query(
		"INSERT INTO Users VALUES (ID(), ?, ?, ?, ?, 0)",
		[first_name, last_name, email, password_hash]
	); // Will throw if email already exists
	[results] = await connection.query(
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
		"SELECT * FROM UsersSafe WHERE id = ?",
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
	const [results] = await connection.query("SELECT id, name FROM SimpleGameView");
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
	description = "",
	category = '',
	min_stock: minStock = 0,
	max_stock: maxStock = 1_000_000,
	minPrice = 0,
	maxPrice = 10000,
	limit = 10
} = {}) {
	// Preventing SQL injection since this value is directly concaténated in the query
	if (isNaN(limit) || limit < 0)
		limit = 10;
	const query = `
		SELECT * FROM SimpleGameView
		WHERE
			name LIKE ?
			AND description LIKE ?
			AND category LIKE ?
			AND quantity_available >= ?
			AND quantity_available <= ?
			AND price >= ?
			AND price <= ?
		LIMIT ${limit}
	`;
	const params = [
		`%${name}%`,
		`%${description}%`,
		`%${category}%`,
		minStock,
		maxStock,
		minPrice,
		maxPrice
	];
	const [results] = await connection.query(query, params);
	return results;
}

export async function getBestSellers() {
	let [results] = await connection.query(
		"SELECT * FROM SimpleGameView ORDER BY GAME_ORDERS_COUNT(id) DESC LIMIT 5"
	);
	return results;
}


export async function getGameQuantity(gameId) {
	let [boardgameAvailableQuantity] = await connection.query("SELECT quantity_available FROM SimpleGameView WHERE id = ?",
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
		"SELECT * FROM FullCarts WHERE userId = ?",
		[userID]
	);

	let answer = {};
	results.forEach((e) => {
		answer[e.id] = e;
	});

	return answer;
}

export async function addItemToCart(userID, gameId, quantity) {
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
	console.log(`Added ${quantity} of '${gameId}' to user '${userID}' cart`);
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
	console.log(`Removed '${gameId}' from user '${userId}' cart`);
}


// #endregion
// #region Orders
export async function getOrderByUserID(userID) {
	const [orders] = await connection.query(
		"SELECT * FROM FullOrders WHERE userId = ? ORDER BY createdAt DESC",
		[userID]
	);

	const grouped = {};
	for (const row of orders) {
		const orderId = row.orderId;
		if (!grouped[orderId]) {
			grouped[orderId] = {
				id: orderId,
				type: row.type,
				totalPrice: row.totalPrice,
				userId: row.userId,
				createdAt: row.createdAt,
				items: []
			};
		}
		// If FullOrders includes OrderItems columns, push them to items
		if (row.gameId) {
			grouped[orderId].items.push({
				id: row.id,
				name: row.name,
				price: row.price,
				description: row.description,
				avg_grade: row.avg_grade,
				min_players: row.min_players,
				max_players: row.max_players,
				min_play_time: row.min_play_time,
				max_play_time: row.max_play_time,
				min_age: row.min_age,
				max_age: row.max_age,
				imageUrl: row.imageUrl,
				quantity_available: row.quantity_available,
				price: row.price,
				quantity: row.quantity
			});
		}
	}
	return grouped;
}

// Create a new order from the user's cart
export async function submitOrder(userID) {
	// Get cart items
	const [cartItems] = await connection.query(
		"SELECT * FROM FullCarts WHERE userId = ?",
		[userID]
	);
	if (!cartItems.length) throw new Error('Cart is empty');

	connection.beginTransaction();

	// Calculate total price
	let orderId;
	try {
		const [orderIdResult] = await connection.query("SELECT ID() as orderId");
		orderId = orderIdResult[0].orderId;
		// Create order
		await connection.query(
			"INSERT INTO Orders (id, type, totalPrice, userId, createdAt) VALUES (?, 'purchase', ?, ?, NOW())",
			[orderId, cartItems[0].total_price, userID]
		);

		// Add items to OrderItems
		for (const item of cartItems) {
			await connection.query(
				"INSERT INTO OrderItems (orderId, gameId, quantity) VALUES (?, ?, ?)",
				[orderId, item.id, item.quantity]
			);
		}

		// Clear cart
		await connection.query("DELETE FROM carts WHERE userId = ?", [userID]);

		await connection.commit();
	} catch (err) {
		await connection.rollback();
		throw err;
	}

	return orderId;
}
//#endregion

// #region Reviews
/**
 * Get all reviews for a specific game, newest first.
 */
export async function getReviewsForGame(gameId) {
	const [results] = await connection.query(
		`SELECT * FROM ReviewsWithAuthors WHERE gameId = ? ORDER BY createdAt DESC`,
		[gameId]
	);
	return results;
}

/**
 * Add a review for a game by a user.
 */
export async function addReview({userId, gameId, description, grade}) {
	// Generate a random 8-char ID for the review
	const [idResult] = await connection.query("SELECT ID() as id");
	const id = idResult[0].id;
	await connection.query(
		`INSERT INTO Reviews (id, userId, gameId, description, grade, createdAt)
		 VALUES (?, ?, ?, ?, ?, NOW())`,
		[id, userId, gameId, description, grade]
	);
	return id;
}

/**
 * Get the review for a game by a specific user (if any).
 */
export async function getUserReviewForGame(userId, gameId) {
	const [results] = await connection.query(
		`SELECT * FROM Reviews WHERE userId = ? AND gameId = ?`,
		[userId, gameId]
	);
	return results[0] || null;
}

/**
 * Update a review for a game by a user.
 */
export async function updateReview({userId, gameId, description, grade}) {
	await connection.query(
		`UPDATE Reviews SET description = ?, grade = ?, createdAt = NOW() WHERE userId = ? AND gameId = ?`,
		[description, grade, userId, gameId]
	);
}

/**
 * Delete a review by userId and gameId (for user) or by review id (for admin).
 */
export async function deleteReview({userId, gameId, reviewId, isAdmin = false}) {
	if (isAdmin && reviewId) {
		await connection.query(`DELETE FROM Reviews WHERE id = ?`, [reviewId]);
	} else if (userId && gameId) {
		await connection.query(`DELETE FROM Reviews WHERE userId = ? AND gameId = ?`, [userId, gameId]);
	} else {
		throw new Error('Insufficient parameters to delete review');
	}
}
// #endregion

