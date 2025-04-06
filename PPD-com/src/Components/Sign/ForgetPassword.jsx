import { Container, Typography, Box, TextField, Button, Link } from "@mui/material";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetClick = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    
    // Simulate sending a reset link
    setMessage("A reset link has been sent to your email.");
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Reset Password
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 2, fontSize: "14px", color: "gray" }}>
            Enter your email address, and we'll send you a link to reset your password.
          </Typography>

          <TextField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            label="Email"
            type="email"
          />

          {message && <Typography sx={{ textAlign: "center", color: "green", mt: 1 }}>{message}</Typography>}

          <Button type="submit" onClick={handleResetClick} fullWidth variant="contained" sx={{ backgroundColor: "black", mt: 2 }}>
            Send Reset Link
          </Button>

          <Typography textAlign={"center"} sx={{ mt: 2 }}>
            <Link href="/login">Back to Login</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
