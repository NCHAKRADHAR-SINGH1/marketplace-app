import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const limit = 12;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProducts();
    fetchFavorites();
  }, [page, search, category, isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getProducts(search, page, limit, category);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await productAPI.getFavorites();
      setFavorites(response.data.map((fav) => fav._id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleFavoriteToggle = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        await productAPI.removeFavorite(productId);
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        await productAPI.addFavorite(productId);
        setFavorites([...favorites, productId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const categories = [
    'all',
    'Electronics',
    'Sports',
    'Food & Beverage',
    'Fitness',
    'Accessories',
    'Kitchen',
    'Health & Beauty',
  ];

  return (
    <div className="products-container">
      <motion.div
        className="search-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Marketplace</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </motion.div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <motion.div
          className="products-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isFavorite={favorites.includes(product._id)}
              onFavoriteToggle={() => handleFavoriteToggle(product._id)}
            />
          ))}
        </motion.div>
      )}

      {products.length === 0 && !loading && (
        <div className="no-products">No products found</div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
