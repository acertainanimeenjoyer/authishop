import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading product:', err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
  if (!product) return <p style={{ padding: '2rem' }}>Product not found.</p>;

  return (
    <div className="detail-page">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button onClick={() => dispatch({ type: 'ADD', payload: product })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
