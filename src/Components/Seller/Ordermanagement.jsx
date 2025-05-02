import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", status: "Pending", total: 120 },
    { id: 2, customer: "Jane Smith", status: "Shipped", total: 200 },
  ]);


  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Order Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>${order.total}</TableCell>
                 <Button
          variant="outlined"
          color="success"
          onClick={() => alert("accepted")}
          sx={{ mr: 1 }}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => alert("refused")}
          sx={{ mr: 1 }}
        >
          Refuse
        </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}