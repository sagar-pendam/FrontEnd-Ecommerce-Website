import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const login = (response) => {
    const data = response.data;

        if (data.status === "success") {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("email", data.email);
          localStorage.setItem("username", data.username);
       let token =   localStorage.setItem("token",data.accessToken)
    setUser({ token });
        } 
       
  
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  toast.info("Logged out successfully!");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for easy usage
export const useAuth = () => {
  return useContext(AuthContext);
};
