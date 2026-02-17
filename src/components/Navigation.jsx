import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/Navigation.css';

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛍️ Marketplace
        </Link>

        {isAuthenticated ? (
          <div className="nav-menu">
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <motion.button
                className="logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="nav-menu">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link register-link">
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
