import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../api/axiosInstance";
const OrderStatus = () => {
  const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
  const { state } = useLocation();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const orderId = state?.orderId;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
  const response = await api.get(
    `/order-api/orders/${orderId}`,
    { headers: getAuthHeader() } // <-- include your header here
  );
  setOrder(response.data);
} catch (err) {
  console.error("Failed to fetch order:", err);
}

    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p className="text-center mt-10">Checking order status...</p>;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {order.status === "CANCELLED" ? (
        <div className="text-red-600 text-center">
          <h2 className="text-3xl font-bold mb-4">❌ Order Cancelled</h2>
          <p>Sorry, some items are out of stock.</p>
        </div>
      ) : (
        <div className="text-green-600 text-center">
          <h2 className="text-3xl font-bold mb-4">✅ Order Placed Successfully</h2>
          <p>Your order ID is <b>{orderId}</b>.</p>
        </div>
      )}

      <button
        onClick={() => navigate("/orders")}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        View My Orders
      </button>
    </motion.div>
  );
};

export default OrderStatus;
