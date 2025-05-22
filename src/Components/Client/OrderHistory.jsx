import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrderHistory = () => {
  // Sample data for order history
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2025-03-15',
      total: '10000.00 DA',
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2025-03-10',
      total: '7550.50 DA',
      status: 'Processing',
    },
    {
      id: 3,
      date: '2025-03-05',
      total: '4500.00 DA',
      status: 'Cancelled',
    },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">You have no orders yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrderHistory;