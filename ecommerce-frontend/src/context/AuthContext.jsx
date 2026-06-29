import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token && refreshToken) {
      setUser({ token, refreshToken });
    }
  }, []);

  // Login function
  const login = (response) => {
    const data = response.data;
    if (data.status === "success") {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);

      setUser({ token: data.accessToken, refreshToken: data.refreshToken });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setUser(null);
    toast.info("Logged out successfully!");
    navigate("/"); // redirect to home
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const res = await api.post("/auth-api/refresh-token", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      const newToken = res.data.accessToken;
      localStorage.setItem("token", newToken);
      setUser((prev) => ({ ...prev, token: newToken }));
      return newToken;
    } catch (err) {
      logout(); // refresh token expired → logout
      toast.error("Session expired. Please login again.");
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
