import axios from "axios";

export const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/cart/orders/create/",
      orderData,
      {
        headers: {
          Authorization: `Token ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create order error:", JSON.stringify(error.response?.data, null, 2) || error.message);
    throw error;
  }
};
