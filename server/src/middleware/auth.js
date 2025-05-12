const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const cookieName = process.env.AUTH_COOKIE_NAME;
	const token = req.cookies && req.cookies[cookieName];
	if (!token)
		return next();

	try {
		const decoded = jwt.decode(token);
		const uid = decoded && decoded.uid;
		if (!uid)
			return next();
		// Dummy user data (replace with DB call later)
		const dummyUser = {
			id: uid,
			name: 'Test User',
			email: 'test@example.com'
		};

		req.user = dummyUser;
	} catch (err) {
		// If token is invalid, clear cookies and proceed
		res.clearCookie(cookieName);
	}
	next();
};

module.exports = authMiddleware;