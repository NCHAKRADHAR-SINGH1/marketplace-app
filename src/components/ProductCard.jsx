import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/ProductCard.css';

const ProductCard = ({ product, isFavorite, onFavoriteToggle }) => {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
          <div className="overlay">View Details</div>
        </div>

        <div className="product-body">
          <h3>{product.title}</h3>

          <div className="rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating || 0))}
              {'☆'.repeat(5 - Math.floor(product.rating || 0))}
            </span>
            <span className="reviews">({product.reviews || 0})</span>
          </div>

          <p className="description">{product.description.substring(0, 60)}...</p>

          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className="category">{product.category}</span>
          </div>
        </div>
      </Link>

      <motion.button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onFavoriteToggle();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
