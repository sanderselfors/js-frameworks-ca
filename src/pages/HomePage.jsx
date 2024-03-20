import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.noroff.dev/api/v1/online-shop')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDiscount = (product) => {
    return product.discountedPrice < product.price ? ((product.price - product.discountedPrice) / product.price) * 100 : 0;
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map(product => (
          <motion.div
            key={product.id}
            className="overflow-hidden border border-gray-300 rounded shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/product/${product.id}`}>
              <motion.img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover w-full h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="px-4 py-2">
                <h3 className="mb-2 text-lg font-bold">{product.title}</h3>
                <p className="mb-2 text-gray-700">{product.description}</p>
                {product.discountedPrice < product.price && (
                  <p className="mb-2 text-green-600">Save {calculateDiscount(product).toFixed(2)}%</p>
                )}
                <p className="text-lg font-bold">${product.discountedPrice.toFixed(2)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
