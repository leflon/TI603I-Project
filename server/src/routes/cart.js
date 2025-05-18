import {Router} from 'express';
import {addItemToCart, getUserCart, removeItemFromCart, submitOrder} from '../lib/db';

const router = Router();

// All cart endpoints require authentication
router.use((req, res, next) => {
	if (!req.user) {
		return res.status(401).json({message: 'Unauthorized', success: false});
	}
	next();
});

router.post('/add', async (req, res) => {
	const {gameId, quantity} = req.body;
	if (!gameId || !quantity) {
		return res.status(400).json({success: false, message: 'Game Id and quantity are required'});
	}
	if (quantity <= 0) {
		return res.status(400).json({success: false, message: 'Quantity must be greater than 0'});
	}
	try {
		await addItemToCart(req.user.id, gameId, quantity);
		res.json({success: true});
	} catch (err) {
		return res.status(400).json({success: false, message: err.message});
	}
});

router.post('/remove', async (req, res) => {
	const {gameId} = req.body;
	if (!gameId) {
		return res.status(400).json({success: false, message: 'Game Id is required'});
	}
	try {
		await removeItemFromCart(req.user.id, gameId);
		res.json({success: true});
	} catch (err) {
		return res.status(400).json({success: false, message: err.message});
	}
});

router.get('/get', async (req, res) => {
	const cart = await getUserCart(req.user.id);
	res.json({cart});
});

router.post('/submit', async (req, res) => {
	try {
		const orderId = await submitOrder(req.user.id);
		res.json({success: true, orderId});
	} catch (err) {
		res.status(400).json({success: false, message: err.message});
	}
});

export default router;