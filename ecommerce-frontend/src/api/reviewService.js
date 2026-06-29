import axios from "axios";

const API_BASE_URL = "/review-api"; // change port as per your backend

//  1. Add a new review
export const addReview = async (reviewData, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId, // sending userId in headers
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error.response?.data || "Failed to add review!";
  }
};

//  2. Get reviews for a specific product
export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error.response?.data || "Failed to load reviews!";
  }
};

//  3. Get reviews made by a specific user
export const getUserReviews = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error.response?.data || "Failed to load user reviews!";
  }
};

//  4. Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error.response?.data || "Failed to delete review!";
  }
};
