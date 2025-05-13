import express from 'express';
import {getAllGames} from '../lib/db.js';
import db from '../lib/db.js';
// Middleware to check admin privileges
function adminOnly(req, res, next) {
	if (!req.user || !req.user.is_admin) {
		return res.status(403).json({error: 'Admin access required'});
	}
	next();
}

const router = express.Router();
router.use(adminOnly);

// #region Game Management

router.get('/all-games', async (req, res) => {
	const games = await getAllGames();
	res.json({success: true, games});
});

// Add a new BoardGame
router.post('/games/add', async (req, res) => {
	const {
		name, price, description, yearPublished, avg_grade, min_players,
		max_players, min_play_time, max_play_time, min_age, max_age,
		quantity_available, quantity_lent, category, family, implementations,
		designers, artists, publishers, mechanics, expansions
	} = req.body;

	try {
		await db.query(
			`INSERT INTO BoardGames (
				id, name, price, description, yearPublished, avg_grade, min_players, max_players,
				min_play_time, max_play_time, min_age, max_age, quantity_available, quantity_lent,
				category, family, implementations, designers, artists, publishers, mechanics, expansions
			) VALUES (ID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				name, price, description, yearPublished, avg_grade, min_players, max_players,
				min_play_time, max_play_time, min_age, max_age, quantity_available, quantity_lent,
				category, JSON.stringify(family), JSON.stringify(implementations), JSON.stringify(designers),
				JSON.stringify(artists), JSON.stringify(publishers), JSON.stringify(mechanics), JSON.stringify(expansions)
			]
		);
		res.status(201).json({success: true});
	} catch (err) {
		res.status(500).json({success: false, error: err.message});
	}
});

// Delete a BoardGame
router.delete('/games/delete/:id', async (req, res) => {
	try {
		await db.query('DELETE FROM BoardGames WHERE id = ?', [req.params.id]);
		res.json({success: true});
	} catch (err) {
		res.status(500).json({success: false, error: err.message});
	}
});

// Update a BoardGame
router.post('/games/update/:id', async (req, res) => {
	const fields = [
		'name', 'price', 'description', 'yearPublished', 'avg_grade', 'min_players',
		'max_players', 'min_play_time', 'max_play_time', 'min_age', 'max_age',
		'quantity_available', 'quantity_lent', 'category', 'family', 'implementations',
		'designers', 'artists', 'publishers', 'mechanics', 'expansions'
	];
	const updates = [];
	const values = [];

	fields.forEach(field => {
		if (req.body[field] !== undefined) {
			// These fields are store as JSON arrays, so we need to stringify them
			if (['family', 'implementations', 'designers', 'artists', 'publishers', 'mechanics', 'expansions'].includes(field)) {
				updates.push(`${field} = ?`);
				values.push(JSON.stringify(req.body[field]));
			} else {
				updates.push(`${field} = ?`);
				values.push(req.body[field]);
			}
		}
	});

	if (updates.length === 0) {
		return res.status(400).json({error: 'No fields to update'});
	}

	values.push(req.params.id);

	try {
		await db.query(
			`UPDATE BoardGames SET ${updates.join(', ')} WHERE id = ?`,
			values
		);
		res.json({success: true});
	} catch (err) {
		res.status(500).json({success: false, error: err.message});
	}
});

// Get all BoardGames
router.get('/games/all', async (req, res) => {
	try {
		const games = await getAllGames();
		res.json({success: true, games});
	} catch (err) {
		res.status(500).json({success: false, error: err.message});
	}
});

// #endregion

export default router;