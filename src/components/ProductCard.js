import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <h3>{product.title.slice(0, 40)}...</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => dispatch({ type: 'ADD', payload: product })}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
