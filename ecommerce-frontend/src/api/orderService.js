import axios from "axios";

const API_BASE_URL = "http://localhost:9191/order-api"; 

//  Create a new order
export const createOrder = async (orderData, userId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId, // sending logged-in user's ID
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response?.data || "Order creation failed!";
  }
};

//  Get a single order by ID
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/show-order/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error.response?.data || "Failed to fetch order.";
  }
};

//  Get all orders (for admin view)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/show-order/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error.response?.data || "Failed to fetch all orders.";
  }
};

//  Get orders for a specific user
export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error.response?.data || "Failed to fetch user orders.";
  }
};
