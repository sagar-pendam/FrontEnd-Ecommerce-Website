import axios from "axios";
import api from "./axiosInstance";
const BASE_URL = "/product-api";


export const getAllProducts = async () => {
  try{
    const response =await axios.get(`http://localhost:9191/product-api/all`);
    console.log("All product",response);
    
   return Array.isArray(response.data) ? response.data : [];
  }
  catch (err) {
    console.error("Error fetching products:", err);
    return []; // return empty array to avoid crashing
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`http://localhost:9191/product-api/product/${id}`);
  return response.data;
};

export const saveProduct = async (product) => {
  try {
    const response = await api.post(`${BASE_URL}/add`, product);
    return response.data;
  } catch (error) {
    console.error("Error saving product", error);
    throw error;
  }
};

export const saveAllProducts = async (products) => {
  try {
    const response = await api.post(`${BASE_URL}/add-all`, products);
    return response.data;
  } catch (error) {
    console.error("Error saving products", error);
    throw error;
  }
};
