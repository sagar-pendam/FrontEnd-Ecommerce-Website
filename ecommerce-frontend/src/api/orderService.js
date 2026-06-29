import axios from "axios";
import api from "./axiosInstance";
const API_BASE_URL = "/order-api"; // via API Gateway

// Reuse JWT token header builder
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Create a new order (secured)
export const createOrder = async (orderData, userId) => {
  try {
    const response = await api.post(
      `${API_BASE_URL}/create-order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId,
          ...getAuthHeader(), // ✅ attach JWT token here
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response?.data || "Order creation failed!";
  }
};

// Other functions unchanged...
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/show-order/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error.response?.data || "Failed to fetch order.";
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/show-order/all`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error.response?.data || "Failed to fetch all orders.";
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/user/${userId}/orders`,
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error.response?.data || "Failed to fetch user orders.";
  }
};
