import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
  return (
    <div className="container px-4 py-8 mx-auto text-center">
      <h1 className="mb-4 text-3xl font-bold">Checkout Success</h1>
      <p className="mb-8 text-lg">Your order was successful!</p>
      <Link to="/" className="text-blue-500 underline">Back to Store</Link>
    </div>
  );
}

export default CheckoutSuccessPage;
