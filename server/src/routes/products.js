import express from 'express';
import {getBestSellers, searchGames, getAllCategories, getGame} from '../lib/db';

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
  res.json({categories});
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

export default router;