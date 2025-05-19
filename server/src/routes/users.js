import express from 'express';
import {getOrderByUserID} from '../lib/db';

const router = express.Router();

// All user routes require authentication
router.use((req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  next();
});

/**
 * @route   GET /api/users/orders
 * @desc    Get user's orders
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await getOrderByUserID(req.user.id);
    res.json({orders});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

export default router;