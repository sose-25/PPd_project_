import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
} from "@mui/material";
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
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 2, color: "#023E8A", fontWeight: "bold" }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ mb: 4, color: "#6c757d" }}
              >
                Have questions or feedback? We'd love to hear from you!
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
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
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                     borderRadius: 7, mt: 2 ,
                    "&:hover": {
                      backgroundColor: "#023E8A",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}