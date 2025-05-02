import { useState } from "react";
import { Container, Typography, Box, TextField, Button, Link } from "@mui/material";
import { signin } from "../../../APIs/Authservice";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();
  
    if (!signInData.username || !signInData.password) {
      setError("Both username and password are required");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      const response = await signin(signInData); 
      console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
      if (response.role === 'seller') {
        localStorage.setItem('user', response.data);
      } else if (response.role === 'client') {
        localStorage.setItem('user_id', response.id);
      }
      if (!response.token) {
        throw new Error("Authentication failed: Token not provided");
      }
  
      navigate("/HomePage"); // Redirect to the homepage
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
      console.log("SignIn Data:", signInData);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }} onSubmit={handleSignInClick}>
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Sign In
          </Typography>
          <TextField
            name="username"
            value={signInData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="username or email"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                  borderRadius: 8,
                },
              },
            }}
          />
          <TextField
            name="password"
            type="password"
            value={signInData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                  borderRadius: 8,
                },
              },
            }}
          />
          {error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ borderRadius: 7, mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          </form>
          <Typography textAlign={"center"} sx={{ mt: 2 }}>
            Don't have an account? <Link href="/SignUp">Sign up</Link>
          </Typography>
      </Box>
    </Container>
  );
}