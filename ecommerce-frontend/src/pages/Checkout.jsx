import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const cartItems = [
    { id: 1, name: "Wireless Headphones", price: 1499, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 2999, quantity: 1 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill in all fields!");
      return;
    }

    navigate("/order-success");

    // You can send order details to backend here
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        🛒 Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Left: Address Form */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Details
          </h3>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Payment Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  Credit / Debit Card
                </label>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Right: Order Summary */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Order Summary
          </h3>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Place Order
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;
