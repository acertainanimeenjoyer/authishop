import React, { useState, useEffect } from 'react';

function FilterBar({ products, setFiltered }) {
  const [category, setCategory] = useState('All');

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    if (category === 'All') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === category));
    }
  }, [category, products, setFiltered]);

  return (
    <div style={{ margin: '1rem 2rem' }}>
      <label style={{ marginRight: '1rem' }}>Filter by Category:</label>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {uniqueCategories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
