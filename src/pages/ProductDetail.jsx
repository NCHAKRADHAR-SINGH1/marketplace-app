import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { motion } from 'framer-motion';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await productAPI.removeFavorite(id);
      } else {
        await productAPI.addFavorite(id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <motion.div
      className="product-detail-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-btn" onClick={() => navigate('/products')}>
        ← Back to Products
      </button>

      <div className="product-detail">
        <motion.div
          className="product-image"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.title} />
        </motion.div>

        <motion.div
          className="product-info"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>{product.title}</h1>

          <div className="rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating || 0))}
              {'☆'.repeat(5 - Math.floor(product.rating || 0))}
            </span>
            <span className="rating-value">
              {product.rating || 0}/5 ({product.reviews || 0} reviews)
            </span>
          </div>

          <div className="category">{product.category}</div>

          <p className="description">{product.description}</p>

          <div className="price-section">
            <span className="price">${product.price}</span>
            <motion.button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </motion.button>
          </div>

          <motion.button
            className="buy-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
