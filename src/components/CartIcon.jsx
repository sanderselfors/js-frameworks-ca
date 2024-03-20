import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";


const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19c0 1.104.896 2 2 2s2-.896 2-2M3 3h1l2.262 11.308A2 2 0 0 0 8 16h8a2 2 0 0 0 1.738-1.048L20 8H6"
    />
  </svg>
);

function CartIcon() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const totalCount = Object.values(items).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartItemCount(totalCount);
  }, [items]);

  return (
    <div className="relative">
      <Link to="/cart" className="text-gray-700">
        <ShoppingCartIcon />
      </Link>
      {cartItemCount > 0 && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full">
          {cartItemCount}
        </div>
      )}
    </div>
  );
}

export default CartIcon;
