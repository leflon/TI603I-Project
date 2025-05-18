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
 * @route   GET /api/users/profile
 * @desc    Get user's profile
 */
router.get('/profile', (req, res) => {
  // Dummy user profile
  const user = {
    id: req.user?.id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  };
  res.json({user});
});

/**
 * @route   GET /api/users/cart
 * @desc    Get user's cart items
 */
router.get('/cart', (req, res) => {
  // Dummy cart items
  const cart = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg'
    }
  ];
  res.json({cart});
});

/**
 * @route   GET /api/users/wishlist
 * @desc    Get user's wishlist items
 */
router.get('/wishlist', (req, res) => {
  // Dummy wishlist items
  const wishlist = [
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg'
    }
  ];
  res.json({wishlist});
});

/**
 * @route   GET /api/users/orders
 * @desc    Get user's orders
 */
router.get('/orders', async (req, res) => {
  try {
    console.log('orders')
    const orders = await getOrderByUserID(req.user.id);
    res.json({orders});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

export default router;