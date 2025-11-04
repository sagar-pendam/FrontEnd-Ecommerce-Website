import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Share2, Plus, Minus } from "lucide-react";
import {
  getUserCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../api/cartApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId") || 1; // mock user

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getUserCart(userId);
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleIncrease = async (productId) => {
    await increaseQuantity(userId, productId);
    loadCart();
  };

  const handleDecrease = async (productId) => {
    await decreaseQuantity(userId, productId);
    loadCart();
  };

  const handleRemove = async (productId) => {
    await removeFromCart(userId, productId);
    toast.info("Item removed from cart");
    loadCart();
  };

  const handleClearCart = async () => {
    await clearCart(userId);
    setCartItems([]);
    toast.success("Cart cleared!");
  };

  const handleShare = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.productName,
          text: `Check out this product: ${item.productName} for ₹${item.price}`,
          url: window.location.origin + `/product/${item.productId}`,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(
        window.location.origin + `/product/${item.productId}`
      );
      toast.info("Product link copied to clipboard!");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <motion.h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingCart className="text-blue-600" /> Your Cart
      </motion.h1>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <motion.div
            key={item.productId}
            className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.productName}</h2>
                <p className="text-gray-500">₹{item.price}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleDecrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => handleIncrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => handleShare(item)}
                className="p-2 rounded-full hover:bg-blue-100"
              >
                <Share2 className="text-blue-600" />
              </motion.button>

              <motion.button
                onClick={() => handleRemove(item.productId)}
                className="p-2 rounded-full hover:bg-red-100"
              >
                <Trash2 className="text-red-500" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total & Checkout */}
      <motion.div className="mt-10 bg-white p-6 rounded-2xl shadow-md max-w-md ml-auto">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600 text-lg">Subtotal</span>
          <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
          <motion.button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700">
            Proceed to Checkout
          </motion.button>
        </Link>

        <motion.button
          onClick={handleClearCart}
          className="w-full mt-3 bg-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-red-700"
        >
          Clear Cart
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
