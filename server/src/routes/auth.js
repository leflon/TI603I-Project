// auth.js (ES module)

import express from 'express';
import jwt from 'jsonwebtoken';
import {checkUserCredentials, createUser} from '../lib/db.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME;

router.get('/me', async (req, res) => {
	if (!req.user) {
		return res.status(401).json({message: 'Unauthorized', success: false});
	}
	const {id, first_name, last_name, email, is_admin} = req.user;
	res.json({user: {id, first_name, last_name, email, is_admin}});
});

router.post('/login', async (req, res) => {
	const {email, password} = req.body;
	const uid = await checkUserCredentials(email, password);
	if (!uid)
		return res.status(401).json({message: 'Invalid credentials', success: false});

	const token = jwt.sign({uid: uid}, JWT_SECRET, {expiresIn: '30d'});
	res.cookie(COOKIE_NAME, token, {httpOnly: true, sameSite: 'lax'});
	res.status(401).json({success: true});
});

router.post('/register', async (req, res) => {
	const {email, password, firstname, lastname} = req.body;
	if (!email || !password || !firstname || !lastname) {
		return res.status(400).json({message: 'Email, password, firstname, and lastname are required', success: false});
	}
	let id;
	try {
		id = await createUser(firstname, lastname, email, password);
	} catch (err) {
		return res.status(400).json({message: err.message, success: false});
	}

	const token = jwt.sign({uid: id}, JWT_SECRET, {expiresIn: '30d'});
	res.cookie(COOKIE_NAME, token, {httpOnly: true, sameSite: 'lax'});
	res.json({success: true});
});

router.post('/logout', (req, res) => {
	res.clearCookie(COOKIE_NAME);
	res.json({message: 'Logged out successfully'});
});

export default router;
