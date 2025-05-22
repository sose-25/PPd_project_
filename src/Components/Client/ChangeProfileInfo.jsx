import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function ChangeProfileInfo() {
  const [profileInfo, setProfileInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Profile information updated:', profileInfo);
  };

  return (
   
      <Paper sx={{maxWidth: 800, margin: 'auto', mt: 4 ,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "white",
        padding: 2,
        boxShadow: 3,
        borderRadius: 1, p: 3, minWidth:500}}>
        <Typography variant="h6" gutterBottom>
          Change Profile Information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            name="fullName"
            value={profileInfo.fullName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={profileInfo.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={profileInfo.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={profileInfo.address}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Paper>
    
  );
}