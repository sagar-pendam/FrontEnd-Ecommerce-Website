import axios from "axios";
import api from "./axiosInstance";
const API_BASE_URL = "/cart-api"; // through API Gateway

// Utility: Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get user's cart
export const getUserCart = async (userId) => {
  const response = await api.get(`${API_BASE_URL}/user/${userId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Add item to cart
export const addToCart = async (item) => {
  const response = await api.post(`${API_BASE_URL}/add`, item, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Remove a specific item
export const removeFromCart = async (userId, productId) => {
  const response = await api.delete(
    `${API_BASE_URL}/remove/${userId}/${productId}`,
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Clear entire cart
export const clearCart = async (userId) => {
  const response = await api.delete(`${API_BASE_URL}/clear/${userId}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
// Increase quantity by 1
export const increaseQuantity = async (userId, productId) => {
  const res = await api.put(
    `${API_BASE_URL}/increase/${userId}/${productId}`,
    {}, // empty body
    { headers: getAuthHeader() } //  wrap inside { headers: ... }
  );
  return res.data;
};

// Decrease quantity by 1
export const decreaseQuantity = async (userId, productId) => {
  const res = await api.put(
    `${API_BASE_URL}/decrease/${userId}/${productId}`,
    {}, // empty body
    { headers: getAuthHeader() } // ✅ wrap inside { headers: ... }
  );
  return res.data;
};
