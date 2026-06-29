import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../api/axiosInstance";
import {createOrder} from '../api/orderService';
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
  // ✅ Setup React Hook Form with validation tracking
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Get products passed from cart or buy-now
  const products = state?.products || [];
  const type = state?.type || "cart";

  // ✅ Safe subtotal calculation (handles various field names)
  const subtotal = products.reduce(
    (sum, item) =>
      sum +
      (Number(item.price || item.amount || item.productPrice || 0) *
        Number(item.quantity || item.qty || item.productQty || 1)),
    0
  );
  const shipping = 99;
  const total = subtotal + shipping;

  // // ✅ Submit order
  // const onSubmit = async (formData) => {
  //   if (products.length === 0) {
  //     alert("No products to order!");
  //     return;
  //   }

  //   const orderPayload = {
  //     userId: localStorage.getItem("userId") || 1,
  //     paymentMethod: formData.paymentMethod,
  //     customerName: formData.name,
  //     address: formData.address,
  //     phone: formData.phone,
  //     items: products.map((p) => ({
  //       productCode: p.productCode,
  //       productName: p.productName || p.name,
  //       quantity: p.quantity || p.qty || 1,
  //       amount: p.price || p.amount || p.productPrice,
  //     })),
  //   };

  //   try {
  //     // await axios.post("http://localhost:8084/order-api/create-order", orderPayload, {
  //     //   headers: { "X-User-Id": localStorage.getItem("userId") || 1 },
  //     // });
  //    let response = await createOrder(orderPayload, localStorage.getItem("userId") || 1);
  //    console.log(response);
     
  //     navigate("/order-success");
  //   } catch (err) {
  //     console.error("Order failed:", err);
  //     alert("Failed to place order. Try again.");
  //   }
  // };
// const onSubmit = async (formData) => {
//   if (products.length === 0) {
//     alert("No products to order!");
//     return;
//   }

//   const orderPayload = {
//     userId: localStorage.getItem("userId") || 1,
//     paymentMethod: formData.paymentMethod.toUpperCase(),
//     customerName: formData.name,
//     address: formData.address,
//     phone: formData.phone,
//     items: products.map((p) => ({
//       productCode: p.productCode,
//       productName: p.productName || p.name,
//       quantity: p.quantity || p.qty || 1,
//       amount: p.price || p.amount || p.productPrice,
//     })),
//   };

//   try {
//     // 1️⃣ Create Order
//     const orderRes = await createOrder(orderPayload, localStorage.getItem("userId") || 1);
//   console.log(orderRes)
//     const storeOrderId = orderRes.orderId;
//     const totalAmount = orderRes.totalAmount;

//     // 2️⃣ Trigger Payment
//     const paymentRes = await axios.post(
//   `http://localhost:9191/payment-api/pay/${storeOrderId}`,
//   null, // request body
//   {
//     params: {
//       // orderId: storeOrderId,
//       amount: totalAmount,
//       paymentMethod: formData.paymentMethod.toUpperCase(),
//     },
//     headers: getAuthHeader(), // ✅ Add token in headers
//   }
// );
// console.log(paymentRes);

//     const payment = paymentRes.data;

//     // 3️⃣ Navigate based on method
//     if (formData.paymentMethod === "cod") {
//       navigate("/order-status", { state: { storeOrderId } });
//     } else if (formData.paymentMethod === "card") {
//       navigate("/payment", {
//         state: {
//           storeOrderId,
//           clientSecret: payment.clientSecret,
//           amount: totalAmount,
//         },
//       });
//     }
//   } catch (err) {
//     console.error("Order or Payment failed:", err);
//     alert("Failed to place order. Try again.");
//   }
// };
const onSubmit = async (formData) => {
  if (products.length === 0) {
    alert("No products to order!");
    return;
  }

  const orderPayload = {
    userId: localStorage.getItem("userId") || 1,
    paymentMethod: formData.paymentMethod.toUpperCase(),
    customerName: formData.name,
    address: formData.address,
    phone: formData.phone,
    items: products.map((p) => ({
      productCode: p.productCode,
      productName: p.productName || p.name,
      quantity: p.quantity || p.qty || 1,
      amount: p.price || p.amount || p.productPrice,
    })),
  };

  try {
    // 1️⃣ Create Order
    const orderRes = await createOrder(orderPayload, localStorage.getItem("userId") || 1);

    const storeOrderId = orderRes.orderId;
    const totalAmount = orderRes.totalAmount;

    // 2️⃣ Trigger Payment
    const paymentRes = await api.post(
      `/payment-api/pay/${storeOrderId}`,
      null,
      {
        params: {
          amount: totalAmount,
          paymentMethod: formData.paymentMethod.toUpperCase(),
        },
        headers: getAuthHeader(),
      }
    );

    const payment = paymentRes.data;

    // 3️⃣ Navigate
    if (formData.paymentMethod === "cod") {
      navigate("/order-status", { state: { orderId: storeOrderId } });

    } else if (formData.paymentMethod === "card") {
      navigate("/payment", {
        state: {
          orderId: storeOrderId,
          clientSecret: payment.clientSecret,
          amount: totalAmount,
          paymentMethod: formData.paymentMethod.toUpperCase(),
        },
      });
    }

  } catch (err) {
    console.error("Order or Payment failed:", err);
    alert("Failed to place order. Try again.");
  }
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
        {/* Left: Shipping Form */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Details
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                {...register("name", { required: "Please enter your name" })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <textarea
                {...register("address", { required: "Please enter your address" })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter your address"
                rows="3"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                {...register("phone", {
                  required: "Please enter your phone number",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-600 mb-1">Payment Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    defaultChecked
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="card" {...register("paymentMethod")} />
                  Credit / Debit Card
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Place Order
            </motion.button>
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

          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products selected.</p>
          ) : (
            products.map((item) => (
              <div key={item.productCode || item.id} className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">{item.productName || item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || item.qty || 1}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ₹
                  {(item.price || item.amount || item.productPrice) *
                    (item.quantity || item.qty || item.productQty || 1)}
                </p>
              </div>
            ))
          )}

          <div className="border-t pt-4 space-y-2 mt-4">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Checkout;
