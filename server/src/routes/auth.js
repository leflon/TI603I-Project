// auth.js (ES module)

import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME;

const DUMMY_USER = {
	userId: 'DUMMY',
	username: 'test',
	password: 'test',
};

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
		const token = jwt.sign({ uid: DUMMY_USER.userId }, JWT_SECRET, { expiresIn: '30d' });
		res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'strict' });
		return res.json({ message: 'Logged in successfully' });
	}
	res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/register', (req, res) => {
	const { email, password, firstname, lastname } = req.body;
	if (!email || !password || !firstname || !lastname) {
		return res.status(400).json({ message: 'Email, password, firstname, and lastname are required' });
	}

	const token = jwt.sign({ uid: DUMMY_USER.userId }, JWT_SECRET, { expiresIn: '30d' });
	res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'strict' });
	res.json({ message: 'Registered successfully (dummy)' });
});

router.post('/logout', (req, res) => {
	res.clearCookie(COOKIE_NAME);
	res.json({ message: 'Logged out successfully' });
});

export default router;
