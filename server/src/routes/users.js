import express from 'express';
import { addItemToWishlist, removeItemFromWishlist, getWishlistByUserID, getOrderByUserID} from '../lib/db';


const router = express.Router();

// All user routes require authentication
router.use((req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  next();
});

router.post('/addwishlist', async (req, res) => {
  const {gameId} = req.body;
  if (!gameId) {
    return res.status(400).json({success: false, message: 'Game Id is required'});
  }
  try {
    await addItemToWishlist(req.user.id, gameId);
    res.json({success: true});
  } catch (err) {
    return res.status(400).json({success: false, message: err.message});
  }
});

router.post('/removewishlist', async (req, res) => {
  const {gameId} = req.body;
  if (!gameId) {
    return res.status(400).json({success: false, message: 'Game Id is required'});
  }
  try {
    await removeItemFromWishlist(req.user.id, gameId);
    res.json({success: true});
  } catch (err) {
    return res.status(400).json({success: false, message: err.message});
  }
});

router.get('/wish', async (req, res) => {
  const wishlist = await getWishlistByUserID(req.user.id);
  res.json({wishlist});
});

router.get('/orders', async (req, res) => {
  const orders = await getOrderByUserID(req.user.id);
  res.json({orders});
});


export default router;

