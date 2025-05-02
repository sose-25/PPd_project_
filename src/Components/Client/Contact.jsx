import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, CssBaseline } from "@mui/material";
import Header from "./Header";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <>
    <CssBaseline />
    <Header />
    <Container sx={{ mt: 4 ,width:"40vw"}}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
    </>
  );
}