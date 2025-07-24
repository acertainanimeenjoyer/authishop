import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

function Navbar({ darkMode, toggleTheme }) {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">🛒 AuthiShop</Link>
      </div>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <Link to="/cart" className="cart-link">
          🧺 Cart
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
