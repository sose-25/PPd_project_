import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

 export const addProduct = async (payload) =>{
  try {
    const response = await axios.post(
      `${API_BASE_URL}/products/product_seller/create/`,payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include user token if required
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in add Product API:", error.response?.data || error.message);
    throw error;
  }
}
 export const updateProduct = async (ProductsellerID,payload ) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/product_seller/update/${ProductsellerID}/`,payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include user token if required
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in update Product API:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/products/product_seller/delete/${productId}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_TOKEN', // include if required
        },
      }
    );
    console.log('Product deleted:', response.data);
    
    // Optionally: refresh product list or show a success message
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
  }
};
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_TOKEN', // include if required
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving products:', error.response?.data || error.message);
    throw error;
  }
};