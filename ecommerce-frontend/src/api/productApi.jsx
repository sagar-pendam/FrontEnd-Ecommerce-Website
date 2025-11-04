import axios from "axios";

const BASE_URL = "http://localhost:9191/product-api";


export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/product/${id}`);
  return response.data;
};

export const saveProduct = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, product);
    return response.data;
  } catch (error) {
    console.error("Error saving product", error);
    throw error;
  }
};

export const saveAllProducts = async (products) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-all`, products);
    return response.data;
  } catch (error) {
    console.error("Error saving products", error);
    throw error;
  }
};
