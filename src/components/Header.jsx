import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

function Header({ cartItemCount }) {
  return (
    <header className="bg-white border-b border-black">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        <Link to="/" className="text-3xl font-bold text-gray-800">Store</Link>

        <nav className="space-x-4 md:flex">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          
        </nav>

        <CartIcon cartItemCount={cartItemCount} />
      </div>
    </header>
  );
}

export default Header;
