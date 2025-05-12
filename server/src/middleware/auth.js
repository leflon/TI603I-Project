import jwt from 'jsonwebtoken';
import {getUserByID} from '../lib/db';

const authMiddleware = async (req, res, next) => {
	const cookieName = process.env.AUTH_COOKIE_NAME;
	const token = req.cookies && req.cookies[cookieName];
	if (!token)
		return next();
	try {
		const decoded = jwt.decode(token);
		const uid = decoded && decoded.uid;
		if (!uid)
			return next();

		const user = await getUserByID(uid);
		req.user = user;
	} catch (err) {
		// If token is invalid, clear cookies and proceed
		res.clearCookie(cookieName);
	}
	next();
};

export default authMiddleware;