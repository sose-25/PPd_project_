import { Container, Typography, Box, TextField, Button, Link } from "@mui/material";
import { useState } from "react";

export default function LogIn() {
  const [Login, setLogin] = useState({ Email: "", password: "" });
  const [error, setError] = useState("");

  const HandleEmailChange = (e) => {
    setLogin({ ...Login, Email: e.target.value });
  };

  const HandlePasswordChange = (e) => {
    setLogin({ ...Login, password: e.target.value });
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch("https://your-authentication-endpoint.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const HandleLoginClick = async (e) => {
    e.preventDefault();
    if (!Login.Email || !Login.password) {
      setError("Both fields are required");
      return;
    }

    try {
      const data = await authenticateUser(Login.Email, Login.password);
      setError("");
      console.log("Login successful:", data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Login
          </Typography>
          <TextField value={Login.Email} onChange={HandleEmailChange} fullWidth margin="normal" label="Email or Username" />
          <TextField value={Login.password} onChange={HandlePasswordChange} fullWidth margin="normal" label="Password" type="password" />
          <Typography sx={{ textAlign: "center" }}>
            <Link sx={{ fontSize: "12px", textAlign: "center" }} href="/ForgetPassword">
              Forget Password?
            </Link>
          </Typography>
          {error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>}
          <Button type="submit" onClick={HandleLoginClick} fullWidth variant="contained" sx={{ backgroundColor: "black", mt: 2 }}>
            Submit
          </Button>
          <Typography textAlign={"center"}>
            <Link href="/SignUp">Create Account</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}