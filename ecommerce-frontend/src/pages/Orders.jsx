import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle } from "lucide-react";

const Orders = () => {
  // Static orders (replace with API call later)
  const orders = [
    {
      id: "ORD12345",
      date: "2025-10-24",
      total: 899,
      status: "Completed",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 899 },
      ],
    },
    {
      id: "ORD12346",
      date: "2025-10-20",
      total: 1299,
      status: "Pending",
      items: [
        { name: "Smart Watch", quantity: 1, price: 1299 },
      ],
    },
    {
      id: "ORD12347",
      date: "2025-10-18",
      total: 499,
      status: "Cancelled",
      items: [
        { name: "Bluetooth Speaker", quantity: 1, price: 499 },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-green-500" size={22} />;
      case "Pending":
        return <Truck className="text-yellow-500" size={22} />;
      case "Cancelled":
        return <Package className="text-red-500" size={22} />;
      default:
        return <Package className="text-gray-400" size={22} />;
    }
  };

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
                <span
                  className={`font-medium ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-3">
              Ordered on <span className="font-medium">{order.date}</span>
            </p>

            <div className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-gray-700 text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-3">
              <p className="text-gray-800 font-semibold">
                Total: ₹{order.total}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                onClick={() =>
                  alert(`Viewing details for Order #${order.id}`)
                }
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
