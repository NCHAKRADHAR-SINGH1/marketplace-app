const Product = require('../models/Product');
const User = require('../models/User');

// Get all products with search and pagination
const getProducts = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, category } = req.query;
    const skipAmount = (parseInt(page) - 1) * parseInt(limit);

    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .limit(parseInt(limit))
      .skip(skipAmount)
      .sort({ createdAt: -1 });

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create product (admin)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, rating, reviews } = req.body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      title,
      description,
      price,
      image,
      category: category || 'General',
      rating,
      reviews,
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product (admin)
const updateProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, rating, reviews } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        image,
        category,
        rating,
        reviews,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to favorites
const addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(productId);
    await user.save();

    res.json({
      message: 'Product added to favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    res.json({
      message: 'Product removed from favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorite,
  removeFavorite,
  getFavorites,
};
