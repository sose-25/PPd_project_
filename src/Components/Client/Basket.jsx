import React, { useState } from 'react';
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

const initialItems = [
  { id: 1, name: 'Product 1', price: 20, quantity: 2,image:"" },
  { id: 2, name: 'Product 2', price: 15, quantity: 1,image:"" },
  { id: 3, name: 'Product 3', price: 30, quantity: 3,image:"" },
];

export default function Basket() {
  const [items, setItems] = useState(initialItems);

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove an item from the basket
  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Update item quantity
  const handleQuantityChange = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  return (
    <Card sx={{ maxWidth: 800,minWidth:450, margin: 'auto', mt: 4 ,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      backgroundColor: "white",
      padding: 2,
      boxShadow: 3,
      borderRadius: 1,
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Shopping Basket
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar><Avatar src={item.image} alt={item.name} /></ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`$${item.price.toFixed(2)} each`}
              />
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value, 10))
                }
                inputProps={{ min: 1 }}
                sx={{ width: '80px', mr: 2 }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}