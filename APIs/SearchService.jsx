import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/products"; 

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/product-seller-search/`, {
      params: { q: query }, 
    });
    return response.data; 
  } catch (error) {
    console.error("Error while searching for products:", error);
    throw error; 
  }
};