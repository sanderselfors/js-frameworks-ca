import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = () => {
    if (Object.keys(items).length === 0) return 0;
    return Object.values(items).reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    clearCart(); 
  };

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
      {Object.keys(items).length === 0 ? (
        <p className="text-center">Your cart is empty. <Link to="/" className="text-blue-500 underline">Continue shopping</Link></p>
      ) : (
        <>
          {Object.values(items).map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b-2">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.title} className="object-cover w-16 h-16 mr-4" />
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-gray-500">${item.discountedPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between mt-8">
            <button onClick={clearCart} className="px-4 py-2 text-white bg-red-500 rounded">Clear Cart</button>
            <p className="text-lg font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex justify-end mt-6">
            <Link to="/checkout-success" onClick={handleCheckout} className="px-4 py-2 mr-4 text-white bg-blue-500 rounded">Checkout</Link>
            <Link to="/" className="px-4 py-2 text-white bg-gray-500 rounded">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
