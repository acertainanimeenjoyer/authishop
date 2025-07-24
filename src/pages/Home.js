import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>🛍️ Explore Our Products</h2>
      <FilterBar products={products} setFiltered={setFiltered} />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
