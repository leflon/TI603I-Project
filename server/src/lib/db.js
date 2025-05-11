
import mysql from 'mysql2/promise';
import bcrypt, { compareSync, hashSync } from 'bcryptjs'
import { config } from 'dotenv';
config();

const connection = await mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
});

function isValidEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function isValidPassword(password) {
	return password.length > 8;
}


function encryptPassword(password_plaintext) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password_plaintext, salt);
	return hash
}

/**
 * Creates a new user in the database.
 *
 * @param {string} first_name - The first name of the user.
 * @param {string} surname - The surname of the user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The plaintext password of the user.
 * @throws {Error} If the provided email is invalid.
 * @throws {Error} If a user with the provided email already exists.
 * @throws {Error} If the provided password does not meet the requirements.
 * @throws {Error} If any of the first_name, surname, or username is empty.
 * @returns {Promise<void>} Resolves when the user is successfully created.
 */
export async function createUser(first_name, surname, username, email, password) {

	if (!isValidEmail(email))
		throw new Error("Provided email is invalid");

	let results = await connection.query(
		'SELECT * FROM users WHERE email = ?',
		[email]
	)
	if (!results.length)
		throw new Error(`A user already has this email '${results.email}'`)

	if (!isValidPassword(password))
		throw new Error(`Provided password '${password}' does not match requirements (see isValidPassword implementation)`);

	if (!(surname.length && first_name.length && username.length))
		throw new Error("At least of first_name, surname or username is empty");

	const password_hash = encryptPassword(password);

	 results = await connection.query(
		"INSERT INTO users VALUES (ID(), ?, ?, ?, ?, ?, 0)",
		[first_name, surname, username, email, password_hash]
	 )

}



/**
 * Verifies user credentials by checking the provided email and password
 * against the database records.
 *
 * @param {string} email - The email address of the user to authenticate.
 * @param {string} password - The plaintext password provided by the user.
 * @returns {boolean} True if the password matches the stored hash, otherwise false.
 * @throws {Error} If no user is found with the provided email.
 * @throws {Error} If more than one user is associated with the provided email.
 */
export async function checkUserCredentials(email, password) {

	const [results] = await connection.query(
		"SELECT * FROM Users WHERE email = ?",
		[email]
	)
	if (!results.length)
		throw new Error(`No user with this email '${email}' is in the database `);
	if (results.length > 1)
		throw new Error(`More than one user is linked to this email '${email}'`);

	return compareSync(password, results[0].password_hash)
}
/**
 * Finds a user by its ID and deletes him from the users table
 * @param {string} userID
 * @returns {void} nothing is returned by the function
 */
export async function deleteUserByID(userID) {
	const [results] = await connection.query(
		"DELETE FROM users WHERE id = ?",
		[userID]
	);

	if (!results.affectedRows)
		throw new Error(`No user has this id '${userID}'`)
}
// functions needed
export async function getCartByUserID(userID) {
	if (!userID)
		throw new Error("userID was not provided");

	const [results] = await connection.query(
		"SELECT * FROM carts WHERE userId = ?",
		[userID]
	)

	if (!results.length)
		return `Cart of user '${userID}' is empty`

	let answer = {}
	results.forEach( (e) => {
		answer[e.gameId] = e.quantity
	})
	answer = Object.fromEntries(
		Object.entries(answer).sort(([, a], [, b]) => b - a)
	);

	return answer
}
export async function getQuantityOfGame(boardgameID) {
	let [boardgameAvailableQuantity] = await connection.query("SELECT quantity_available FROM boardgames WHERE id = ?",
		[boardgameID]
	)

	if (!boardgameAvailableQuantity.length)
		throw new Error(`No game found wtih this id '${boardgameID}'`)

	return boardgameAvailableQuantity[0].quantity_available



}
export async function decreaseGameQuantityByQuantity(boardgameID, quantity){
	let boardgameAvailableQuantity = await getQuantityOfGame(boardgameID)

	if (!(boardgameAvailableQuantity >= quantity)){
		throw Error(`There is not enough copies of game "${boardgameID}' in stock ! (asked for ${quantity}, but only ${boardgameAvailableQuantity + quantity} in stock)`)
	}

	const [results] = await connection.query(
		"UPDATE boardgames SET quantity_available = ? WHERE id = ?;",
		[boardgameAvailableQuantity - quantity, boardgameID]
	)

}
export async function addItemToCart(userID, boardgameID, quantity){
	if (userID.length && boardgameID.length && quantity.length)
		throw new Error(`Invalid parameter(s): userID='${userID}', boardgameID='${boardgameID}', quantity='${quantity}'`);

	let quantityInStock = await getQuantityOfGame(boardgameID)
	if (quantityInStock < quantity)
		throw new Error(`Not enough of '${boardgameID}' in stock ('${quantityInStock}' available vs '${quantity}' asked)`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [boardgameID]
	)
	if (!gameExists.length)
		throw Error(`No game with id '${boardgameID}' in database`)

	let [possessedQuantity] = await connection.query(
		"SELECT quantity from carts WHERE gameId = ? AND userId = ?",
		[boardgameID, userID]
	)
	let newQuantity = quantity
	if (possessedQuantity.length){
		possessedQuantity = possessedQuantity[0].quantity
		newQuantity = possessedQuantity + quantity
	} 
	

	if (possessedQuantity){
		let [results] = await connection.query(
			"UPDATE carts SET quantity = ? WHERE userID = ? AND gameID = ?",
			[newQuantity, userID, boardgameID ]
		)
		await decreaseGameQuantityByQuantity(boardgameID, quantity)
		return `Successfully added ${quantity} copie(s) of item '${boardgameID}' to '${userID}'s cart`	
	}
	else {
		let [results] = await connection.query(
			"INSERT INTO carts VALUES (?, ?, ?)",
			[boardgameID, userID, newQuantity]
		)
		await decreaseGameQuantityByQuantity(boardgameID, quantity);
		return `Successfully added ${quantity} copie(s) of item '${boardgameID}' to '${userID}'s cart`	
	}
}
export async function getWishlistByUserID(userID){
	if (!userID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}'`);
	const [results] = await connection.query("SELECT gameId from wishlists WHERE userId = ?", [userID])

	let answer = []
	results.forEach((e) => {
		answer.push(e.gameId)
	})

	return answer
	
}
export async function addItemToWishlist(userID, boardgameID){
	if (!userID.length || !boardgameID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}', boardgameID='${boardgameID}'`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [boardgameID]
	)
	if (!gameExists.length)
		throw Error(`No game with id '${boardgameID}' in database`) 

	let [gameInWishlist] = await connection.query(
		"SELECT gameId from wishlists WHERE gameId = ? AND userId = ?",
		[boardgameID, userID] 
	)
	if (gameInWishlist.length){
		console.log(`Game '${boardgameID}' is already in user '${userID}'s wishlist !`)
		return
	}
	
	let [results] = await connection.query(
		"INSERT INTO wishlists VALUES (?, ?)",
		[boardgameID, userID]
	)

	return `Successfully added game '${boardgameID}' to user '${userID}'s wishlist`
	
}
export async function removeItemFromWishlist(userID, boardgameID){
	if (!userID.length || !boardgameID.length)
		throw new Error(`Invalid parameter(s): userID='${userID}', boardgameID='${boardgameID}'`);

	let [gameExists] = await connection.query(
		"SELECT id from boardgames WHERE id = ?", [boardgameID]
	)
	if (!gameExists.length)
		throw Error(`No game with id '${boardgameID}' in database`) 

	const [results] = await connection.query(
		"DELETE FROM wishlists WHERE gameId = ? AND userId = ?",
		[boardgameID, userID]
	)
	return `Successfully deleted '${boardgameID}' from '${userID}'s wishlist`;
	

}
export async function getOrderByUserID(userID){
	const [results] = connection.query(
		"SELECT * FROM orders WHERE userId = ?", [userID]
	)
	return results
}
