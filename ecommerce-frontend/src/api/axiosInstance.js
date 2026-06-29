import axios from "axios";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:9191", // your backend base URL
});

// Function to attach interceptors
export const setupInterceptors = (auth) => {
  api.interceptors.request.use(
    (config) => {
      const token = auth.user?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        auth.user?.refreshToken &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const newToken = await auth.refreshToken();
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest); // retry original request
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default api;
