import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion"
import api from "../api/axiosInstance";
const Payment = () => {
  const { state } = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
// Guard: prevent direct access / page refresh
  // if (!state?.clientSecret) {
  //   navigate("/cart");
  //   return null;
  // }
  useEffect(() => {
  if (!state?.clientSecret) {
    navigate("/cart");
  }
}, [state, navigate]);
  // const { orderId, clientSecret, amount } = state || {};
  const { orderId, clientSecret, amount, paymentMethod } = state;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error("Payment failed:", result.error.message);
      navigate("/order-failed", { state: { orderId, reason: "Payment failed" } });
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", result.paymentIntent.id);

      //  CALL BACKEND CONFIRM API
      await api.post(`/payment-api/confirm`, null, { params: { orderId, paymentIntentId: result.paymentIntent.id, }, headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, });

      navigate("/order-success", { state: { orderId } });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-6">💳 Complete Your Payment</h2>

      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <p className="mb-2">Order ID: {orderId}</p>
        <p className="mb-4">Amount: ₹{amount}</p>

        <CardElement className="border p-3 rounded-md mb-4" />

        <motion.button
          onClick={handlePayment}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Pay ₹{amount}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Payment;
