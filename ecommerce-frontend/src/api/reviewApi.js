import axios from "axios";
import api from "./axiosInstance";
const REVIEW_API = "/review-api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addReview = async (review) => {
  const res = await api.post(`${REVIEW_API}/add`, review, { headers: getAuthHeader() });
  return res.data;
};

export const getReviewsByProduct = async (productCode) => {
  const res = await api.get(`${REVIEW_API}/product/${productCode}`, { headers: getAuthHeader() });
  return res.data;
};

export const getUserReviewForProduct = async (productCode, userId) => {
  const res = await api.get(`${REVIEW_API}/product/${productCode}/user/${userId}`, { headers: getAuthHeader() });
  return res.data;
};

export const updateReview = async (reviewId, updatedReview) => {
  const res = await api.put(`${REVIEW_API}/update/${reviewId}`, updatedReview, { headers: getAuthHeader() });
  return res.data;
};

export const deleteReview = async (reviewId) => {
  const res = await api.delete(`${REVIEW_API}/delete/${reviewId}`, { headers: getAuthHeader() });
  return res.data;
};
