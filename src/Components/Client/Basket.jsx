import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  TextField,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createOrder } from '../../../APIs/cartservice';


export default function Basket() {
  const [items, setItems] = useState([]);
  const getToken = () => {
    return localStorage.getItem("access") || localStorage.getItem("token") || "";
  };

  const token = getToken(); 
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const parsedItems = cartItems.map(item => ({
      ...item,
      price: parseFloat(item.price), // Ensure price is a number
    }));
    setItems(parsedItems);
  }, []);

  const handleCheckOut = async () => {
    if (items.length === 0) {
      alert("Your cart is empty. Please add items to the cart before checking out.");
      return;
    }
  
    const clientId = parseInt(localStorage.getItem("user_id"), 10); 
    if (!clientId) {
      alert("User not logged in. Please log in to proceed with checkout.");
      return;
    }
  
    const orderData = {
      items: items.map(item => ({
        product_seller_id: item.proseller_id,
        quantity: item.quantity,
      })),
    };
    try {
      console.log("Payload being sent:", JSON.stringify(orderData, null, 2));
      console.log("Order Data:", orderData);
      const response = await createOrder(orderData,token); 
      console.log("Order created:", response);
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setItems([]);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  const totalPrice = items.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0; 
    return total + itemPrice * item.quantity;
  }, 0);

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(1, newQuantity);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <Box
      id="cart"
      sx={{
        width: "866px",
        height: "auto", // Adjust height to fit content dynamically
        background: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <table
        className="cart-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px", // Add spacing below the table
        }}
      >
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td>{item.product_name}</td>
              <td>{item.price.toFixed(2)} DA</td>
              <td>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  inputProps={{ min: 1 }}
                  sx={{
                    width: "80px", // Increase width for better visibility
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    backgroundColor: "#F8F9FA",
                    color: "#2C2C2C",
                    fontSize: "14px",
                    textAlign: "center", // Center-align text
                  }}
                />
              </td>
              <td>
                <Button
                  onClick={() => handleRemoveItem(index)}
                  sx={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    color: "#DC3545",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <Box
        className="cart-footer"
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space between total price and button
          alignItems: "center",
          width: "100%", // Ensure footer spans the full width
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#2C2C2C",
          }}
        >
          Total Price: {totalPrice.toFixed(2)} DA
        </Typography>
        <Button
          className="buy-now-cart"
          onClick={handleCheckOut}
          sx={{
            width: "200px", // Adjust button width for better alignment
            height: "50px",
            backgroundColor: "transparent",
            border: "2px solid #023E8A",
            color: "#023E8A",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}