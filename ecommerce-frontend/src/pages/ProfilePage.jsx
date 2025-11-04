import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBoxOpen, FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { getUserCart } from "../api/cartApi";
import { getUserFavorites } from "../api/favoriteApi";

import { getOrdersByUserId } from "../api/orderService";


const ProfilePage = () => {
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Unkown" ,
    email: localStorage.getItem("email") || "Unkown"
    
  });

  const [stats, setStats] = useState({
    cart: 0,
    wishlist: 0,
    orders: 0,
  });
  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    const fetchStats = async () => {
      try {
        const [cartData, favData, orderData] = await Promise.all([
          getUserCart(userId),
          getUserFavorites(userId),
            0,//  getOrdersByUserId(userId),
        ]);
  
        setStats({
          cart: cartData.length,
          wishlist: favData.length,
          orders: orderData.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
  
    fetchStats();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Card */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-600"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
       

        {/* Edit Profile */}
        <button
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 mx-auto"
        >
          <FaUserEdit /> Edit Profile
        </button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Cart */}
        <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
          <FaShoppingCart className="text-3xl text-indigo-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Cart Items</h3>
          <p className="text-gray-500 text-sm mt-1">{stats.cart} items</p>
        </div>

        {/* Wishlist */}
        <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
          <FaHeart className="text-3xl text-pink-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
          <p className="text-gray-500 text-sm mt-1">{stats.wishlist} items</p>
        </div>

        {/* Orders */}
        <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
          <FaBoxOpen className="text-3xl text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
          <p className="text-gray-500 text-sm mt-1">{stats.orders} total</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          to="/cart"
          className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          View Cart
        </Link>
        <Link
          to="/wishlist"
          className="px-5 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
        >
          View Wishlist
        </Link>
        <Link
          to="/orders"
          className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          View Orders
        </Link>
        <button
          onClick={handleLogout}
          className="px-5 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 flex items-center gap-2 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
