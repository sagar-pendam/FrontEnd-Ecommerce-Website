import axios from "axios";
import api from "./axiosInstance";
const API_BASE_URL = "/favorite-api"; // Gateway route

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//  Add to favorites
export const addToFavorites = async (favorite) => {
  const res = await api.post(`${API_BASE_URL}/add`, favorite, {
    headers: getAuthHeader(),
  });
  return res.data;
};

//  Remove from favorites
export const removeFromFavorites = async (userId, productId) => {
  const res = await api.delete(
    `${API_BASE_URL}/remove/${userId}/${productId}`,
    { headers: getAuthHeader() }
  );
  return res.data;
};

//  Get user favorites
export const getUserFavorites = async (userId) => {
  const res = await api.get(`${API_BASE_URL}/${userId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
