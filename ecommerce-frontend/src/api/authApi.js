import axios from "axios";
import api from "./axiosInstance";

const BASE_URL = "/auth-api"; // no need to repeat localhost if api already has baseURL

export const registerUser = async (userData) => {
  const response = await api.post(`${BASE_URL}/register`, userData);
  return response; // full axios response
};

export const loginUser = async (credentials) => {
  const response = await api.post(`${BASE_URL}/login`, credentials);
  return response; // full axios response
};


// export const loginUser = async (credentials) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/login`, {
//       credentials
//     });

//     const data = response.data;

//     if (data.status === "success") {
//       localStorage.setItem("accessToken", data.accessToken);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       localStorage.setItem("userId", data.userId);
//       localStorage.setItem("email", data.email);
//       localStorage.setItem("username", data.username);

//       // toast.success("Login successful!");
//       return response;
//     } else {
//       // toast.error(data.message || "Login failed");
//     }
//   } catch (error) {
//     // toast.error(error.response?.data?.message || "Login error");
//   }
// };