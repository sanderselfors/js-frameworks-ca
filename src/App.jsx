
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './root';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
