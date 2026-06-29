import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId } = state || {};
  const [order, setOrder] = useState(null);
  const [refundDone, setRefundDone] = useState(false); // NEW

  // update status api
  const updatePaymentStatus = async (orderId, status) => {
    try {
      await api.post(
        `/payment-api/update-status/${orderId}`,
        null,
        {
          params: { status },
          headers: getAuthHeader(),
        }
      );
    } catch (err) {
      console.error("Payment update failed:", err);
    }
  };
 
  // refund api
  const refundPayment = async (orderId, amount) => {
    try {
      await api.post(
        `/payment-api/refund/${orderId}`,
        null,
        {
          params: { amount },
          headers: getAuthHeader(),
        }
      );

      setRefundDone(true); // Show refund UI

    } catch (err) {
      console.error("Refund failed:", err);
    }
  };

  // fetch order & trigger status logic
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(
          `/order-api/orders/${orderId}`,
          { headers: getAuthHeader() }
        );
       console.log("Order Response:", response.data);
console.log("Order Status:", response.data.status);

        console.log("State:", state);
console.log("orderId received:", orderId);

        setOrder(response.data);

       
      

      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);


  // Redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate("/products"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl p-10 max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={refundDone ? "text-red-500 mb-4" : "text-green-500 mb-4"}
        >
          <CheckCircle size={80} />
        </motion.div>

        {/* Text */}
        {!refundDone ? (
          <>
            <motion.h2 className="text-3xl font-bold text-gray-800 mb-2">
              Order Confirmed 🎉
            </motion.h2>
            <p className="text-gray-600 mb-6">
              Thank you for shopping! Processing your order...
            </p>
          </>
        ) : (
          <>
            <motion.h2 className="text-3xl font-bold text-red-600 mb-2">
              Order Cancelled ❌
            </motion.h2>
            <p className="text-gray-700 mb-6 font-semibold">
              ₹{order?.totalAmount} has been refunded successfully 💰
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
