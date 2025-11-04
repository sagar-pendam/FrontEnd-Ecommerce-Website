import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products"); // redirect after 4 seconds
    }, 4000);
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
        {/* Success Icon */}
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-green-500 mb-4"
        >
          <CheckCircle size={80} />
        </motion.div>

        {/* Text Content */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Order Confirmed 🎉
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Thank you for shopping with <span className="font-semibold text-indigo-600">ShopEase</span>!  
          Your order has been placed successfully.
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="flex gap-2 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                repeat: Infinity,
              },
            },
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 bg-indigo-500 rounded-full"
              variants={{
                hidden: { opacity: 0.3, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>

        {/* Button to go manually */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
