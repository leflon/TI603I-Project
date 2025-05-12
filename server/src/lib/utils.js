export function isValidEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

/**
 * Checks if a password is valid based on the following criteria:
 * - At least 8 characters long
 * - Contains at least one lowercase letter
 * - Contains at least one uppercase letter
 * - Contains at least one digit
 * - Contains at least one special character (non-word character or underscore)
 * @param {string} password - The password string to validate.
 * @returns {boolean} True if the password meets all criteria, false otherwise.
 */
export function isValidPassword(password) {
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
	return re.test(password);
}