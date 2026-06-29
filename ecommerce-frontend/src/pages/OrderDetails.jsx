import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Truck, CheckCircle, Package } from "lucide-react";
import { getOrderById } from "../api/orderService";  // <-- you will add this API

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusIcons = {
    COMPLETED: <CheckCircle className="text-green-500" size={22} />,
    PENDING: <Truck className="text-yellow-500" size={22} />,
    CANCELLED: <Package className="text-red-500" size={22} />
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="p-8 text-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-8 text-center text-red-600">Order not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        className="flex items-center gap-2 text-gray-700 mb-4 hover:text-gray-900"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Order Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Order #{order.id}
          </h1>
          <div className="flex items-center gap-2">
            {statusIcons[order.status]}
            <span className="text-gray-700 font-medium">{order.status}</span>
          </div>
        </div>

        {/* Order Date */}
        <p className="text-gray-500 text-sm mb-6">
          Ordered on{" "}
          <span className="font-medium">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </p>

        {/* Shipping Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Shipping Details
          </h2>
          <div className="text-gray-600">
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>
        </div>

        {/* Items */}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-gray-100 p-3 rounded-md"
            >
              <div>
                <p className="font-medium text-gray-800">{item.productName}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="text-gray-800 font-semibold">
                ₹{item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t mt-6 pt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">
            Total: ₹{order.totalAmount}
          </p>

          {/* Action Buttons */}
          {order.status === "PENDING" && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Cancel Order
            </button>
          )}

          {order.status === "COMPLETED" && (
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Write Review
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetails;
