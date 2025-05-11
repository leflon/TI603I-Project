import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/products/bestsellers
 * @desc    Get all products
 */
router.get('/bestsellers', (req, res) => {
  // Dummy data before database integration
  res.json({
    bestsellers: [
      {
        id: 1,
        name: 'Product 1',
        price: 29.99,
        imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg'
      },
      {
        id: 2,
        name: 'Product 2',
        price: 39.99,
        imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg'
      },
      {
        id: 3,
        name: 'Product 3',
        price: 49.99,
        imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg'
      }
    ]
  });
});

/**
 * @route   GET /api/products/categories
 * @desc    Get all product categories
 */
router.get('/categories', (req, res) => {
  // Dummy categories
  res.json({
    categories: ['Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG']
  });
});

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 */
router.get('/:id', (req, res) => {
  const products = [
    {
      id: 'BG000001',
      name: 'Catan',
      price: 34.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Trade, build, and settle the island of Catan in this classic strategy game.',
      yearPublished: 1995,
      avg_grade: 8.2,
      min_players: 3,
      max_players: 4,
      min_play_time: 60,
      max_play_time: 120,
      min_age: 10,
      max_age: null,
      quantity_available: 5,
      quantity_lent: 1,
      category: 'Strategy'
    },
    {
      id: 'BG000002',
      name: 'Pandemic',
      price: 29.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Work together as a team to eradicate deadly diseases threatening the world.',
      yearPublished: 2008,
      avg_grade: 8.0,
      min_players: 2,
      max_players: 4,
      min_play_time: 45,
      max_play_time: 60,
      min_age: 8,
      max_age: null,
      quantity_available: 3,
      quantity_lent: 0,
      category: 'Cooperative'
    },
    {
      id: 'BG000003',
      name: 'Ticket to Ride',
      price: 39.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Build your train routes across North America in this fast-paced board game.',
      yearPublished: 2004,
      avg_grade: 7.5,
      min_players: 2,
      max_players: 5,
      min_play_time: 30,
      max_play_time: 60,
      min_age: 8,
      max_age: null,
      quantity_available: 4,
      quantity_lent: 2,
      category: 'Family'
    }
  ];
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json({product});
  } else {
    res.status(404).json({message: 'Product not found'});
  }
});

/**
 * @route   GET /api/products/search
 * @desc    Search products by query
 */
router.get('/search', (req, res) => {
  const {q} = req.query;
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Description for Product 1',
      category: 'Action'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Description for Product 2',
      category: 'Adventure'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 49.99,
      imageUrl: 'https://i.ytimg.com/vi/11e0LgJ_giw/sddefault.jpg',
      description: 'Description for Product 3',
      category: 'Puzzle'
    }
  ];
  if (!q) {
    return res.json({results: []});
  }
  const results = products.filter(
    p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())
  );
  res.json({results});
});

export default router;