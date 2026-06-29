import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle } from "lucide-react";
import {getOrdersByUserId} from "../api/orderService";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate()
  const userId = localStorage.getItem("userId");   // stored at login

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId(userId);
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getStatusIcon = (status) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return <CheckCircle className="text-green-500" size={22} />;
      case "PENDING":
        return <Truck className="text-yellow-500" size={22} />;
      case "CANCELLED":
        return <Package className="text-red-500" size={22} />;
      default:
        return <Package className="text-gray-400" size={22} />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📦 My Orders
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 && (
          <p className="text-center text-gray-600">No orders found.</p>
        )}

        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg text-gray-800">
                Order #{order.id}
              </h2>

              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className={`font-medium ${
                  order.status === "COMPLETED"
                    ? "text-green-600"
                    : order.status === "PENDING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-3">
              Ordered on{" "}
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>

            <div className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-gray-700 text-sm">
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>₹{item.amount}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-3">
              <p className="text-gray-800 font-semibold">
                Total: ₹{order.totalAmount}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                onClick={() => navigate(`/orders/${order.id}`)}

              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
