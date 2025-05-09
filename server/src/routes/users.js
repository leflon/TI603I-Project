import express from 'express';



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
router.get('/orders', (req, res) => {
  const statuses = ['processed', 'shipped', 'delivered'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  // Dummy orders
  const orders = [
    {
      orderId: 101,
      items: [
        {
          id: 1,
          name: 'Product 1',
          price: 29.99
        }
      ],
      total: 29.99,
      date: '2024-06-01',
      status
    }
  ];
  res.json({orders});
});

export default router;