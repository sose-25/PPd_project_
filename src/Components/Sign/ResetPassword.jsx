import { Container, Typography, Box, TextField, Button, Link } from "@mui/material";
import { useState } from "react";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Simulate password update
    setMessage("Your password has been reset successfully.");
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Set New Password
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 2, fontSize: "14px", color: "gray" }}>
            Enter a new password for your account.
          </Typography>

          <TextField
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            label="New Password"
          />
          <TextField
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            label="Confirm Password"
          />

          {message && <Typography sx={{ textAlign: "center", color: "green", mt: 1 }}>{message}</Typography>}

          <Button type="submit" onClick={handleResetPassword} fullWidth variant="contained" sx={{ backgroundColor: "black", mt: 2 }}>
            Reset Password
          </Button>

          <Typography textAlign={"center"} sx={{ mt: 2 }}>
            <Link href="/login">Back to Login</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
