import { Container, Typography, Box, TextField, Button, Link, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client",
    age: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword || !signUpData.age) {
      setError("All fields are required");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log(signUpData);
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Sign Up
          </Typography>
          <TextField name="email" value={signUpData.email} onChange={handleChange} fullWidth margin="normal" label="Email" />
          <TextField name="password" type="password" value={signUpData.password} onChange={handleChange} fullWidth margin="normal" label="Password" />
          <TextField name="confirmPassword" type="password" value={signUpData.confirmPassword} onChange={handleChange} fullWidth margin="normal" label="Confirm Password" />

          <TextField
            select
            name="age"
            value={signUpData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Your Age"
          >
            {Array.from({ length: 83 }, (_, i) => i + 18).map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="userType"
            value={signUpData.userType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Account Type"
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>

          {error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>}

          <Button type="submit" onClick={handleSignUpClick} fullWidth variant="contained" sx={{ backgroundColor: "black", mt: 2 }}>
            Register
          </Button>

          <Typography textAlign={"center"}>
            Do you already have an account? <Link href="/Login">Sign in</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
