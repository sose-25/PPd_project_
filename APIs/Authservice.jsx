import axios from "axios";

export const signin = async (signInData) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/signin/", signInData, {
      headers: {
        "Content-Type": "application/json", // Ensure the request body is JSON
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Signin API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const signup = async (signUpData) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/signup/", signUpData, {
      headers: {
        "Content-Type": "application/json", // Ensure the request body is JSON
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Signup API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.username || error.response?.data?.message || "Signup failed");
  }
};