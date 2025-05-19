import express from 'express';
import {getBestSellers, searchGames, getAllCategories, getGame, getReviewsForGame, addReview, getUserReviewForGame, updateReview, deleteReview} from '../lib/db';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/products/bestsellers
 * @desc    Get all products
 */
router.get('/bestsellers', async (req, res) => {
  const bestsellers = await getBestSellers();
  return res.json({bestsellers});
});

/**
 * @route   GET /api/products/categories
 * @desc    Get all product categories
 */
router.get('/categories', async (req, res) => {
  let {limit = 10} = req.query;
  limit = parseInt(limit);
  const categories = await getAllCategories(limit);
  res.json({success: true, categories});
});

/**
 * @route   GET /api/products/search
 * @desc    Search products by query
 */
router.get('/search', async (req, res) => {
  let {
    name = "",
    category = '',
    minPlayers = 0,
    maxPlayers = 100,
    minPlayTime = 0,
    maxPlayTime = 10000,
    minAge = 0,
    maxAge = 100,
    minPrice = 0,
    maxPrice = 10000,
    limit = 10
  } = req.query;
  limit = parseInt(limit);
  const products = await searchGames({
    name,
    category,
    minPlayers,
    maxPlayers,
    minPlayTime,
    maxPlayTime,
    minAge,
    maxAge,
    minPrice,
    maxPrice,
    limit
  });
  res.json({products});
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await getGame(id);
  if (!product) {
    return res.status(404).json({message: 'Product not found'});
  }
  return res.json({product});
});

// Get all reviews for a product
router.get('/:id/reviews', async (req, res) => {
  const {id} = req.params;
  try {
    const reviews = await getReviewsForGame(id);
    res.json({success: true, reviews});
  } catch (err) {
    res.status(500).json({success: false, error: err.message});
  }
});

// Get the current user's review for a product
router.get('/:id/review', authMiddleware, async (req, res) => {
  const {id} = req.params;
  if (!req.user) return res.status(401).json({success: false, error: 'Not logged in'});
  try {
    const review = await getUserReviewForGame(req.user.id, id);
    res.json({success: true, review});
  } catch (err) {
    res.status(500).json({success: false, error: err.message});
  }
});

// Add a review for a product
router.post('/:id/review', authMiddleware, async (req, res) => {
  const {id} = req.params;
  if (!req.user) return res.status(401).json({success: false, error: 'Not logged in'});
  const {description, grade} = req.body;
  try {
    await addReview({userId: req.user.id, gameId: id, description, grade});
    res.json({success: true});
  } catch (err) {
    res.status(500).json({success: false, error: err.message});
  }
});

// Update a review for a product (user only)
router.patch('/:id/review', authMiddleware, async (req, res) => {
  const {id} = req.params;
  if (!req.user) return res.status(401).json({success: false, error: 'Not logged in'});
  const {description, grade} = req.body;
  try {
    await updateReview({userId: req.user.id, gameId: id, description, grade});
    res.json({success: true});
  } catch (err) {
    res.status(500).json({success: false, error: err.message});
  }
});

// Delete own review (user)
router.delete('/:id/review', authMiddleware, async (req, res) => {
  const {id} = req.params;
  if (!req.user) return res.status(401).json({success: false, error: 'Not logged in'});
  try {
    await deleteReview({userId: req.user.id, gameId: id});
    res.json({success: true});
  } catch (err) {
    res.status(500).json({success: false, error: err.message});
  }
});



export default router;