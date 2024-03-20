import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const addItemToCart = useCartStore(state => state.addItem);

  useEffect(() => {
    axios.get(`https://api.noroff.dev/api/v1/online-shop/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  const calculateDiscount = () => {
    return product.discountedPrice < product.price ? ((product.price - product.discountedPrice) / product.price) * 100 : 0;
  };

  if (!product) {
    return <div className="max-w-4xl px-4 py-8 mx-auto text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex items-center justify-center flex-grow">
        <div className="max-w-6xl px-4 py-8 mx-auto">
          <motion.div
            className="flex flex-col items-center lg:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 lg:mr-8 lg:mb-0">
              <motion.img
                src={product.imageUrl}
                alt={product.title}
                className="object-contain w-full h-64 lg:w-96 lg:h-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div>
              <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
              {product.discountedPrice < product.price && (
                <p className="mb-2 text-lg text-gray-500">Price: <span className="line-through">${product.price.toFixed(2)}</span></p>
              )}
              <p className="mb-4 text-lg font-bold">${product.discountedPrice.toFixed(2)}</p>
              {product.discountedPrice < product.price && (
                <p className="mb-4 text-sm text-green-600">Save {calculateDiscount().toFixed(2)}%</p>
              )}
              <p className="mb-4 max-w-96">{product.description}</p>
              <motion.button
                onClick={handleAddToCart}
                className="px-4 py-2 text-white bg-blue-500 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
          {product.reviews.length > 0 && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="mb-4 text-xl font-bold">Reviews</h2>
              {product.reviews.map(review => (
                <div key={review.id} className="mb-4">
                  <p className="font-bold">{review.username}</p>
                  <p>Rating: {review.rating}</p>
                  <p>{review.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
