const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

router.post('/favorite/add', auth, addFavorite);
router.post('/favorite/remove', auth, removeFavorite);
router.get('/user/favorites', auth, getFavorites);

module.exports = router;
