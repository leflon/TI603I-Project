
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
	const [results] = await connection.query(
		"SELECT * FROM carts WHERE userId = ?",
		[userID]
	)
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


// export async function addItemToCart(userID, boardgameID, quantity){
// 	const [results] = await connection.query(
// 		"SELECT * from carts WHERE gameId = ? AND userId"
// 	)
	
// 	const [results] = await connection.query(
// 		"INSERT INTO carts VALUES (?, ?, ?)",
// 		[boardgameID, userID, quantity]
// 	)
// }

// Get ordersByUserID
export async function getOrderByUserID(userID){
	const [results] = connection.query(

	)
}

// Get wishlistByUserID