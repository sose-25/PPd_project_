import { Container, Typography, Box, TextField, Button, Link, MenuItem } from "@mui/material";
import { useState } from "react";
import { signup } from "../../../APIs/Authservice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!signUpData.username || !signUpData.password || !signUpData.role) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await signup(signUpData); // Call the signup API
      console.log("Signup successful:", response);

      // Display a success message (optional)
      alert("Signup successful! Please log in.");

      // Redirect to the login page
      navigate("/Login");
    } catch (error) {
      setError(error.message || "Signup failed"); // Display error message
    } finally {
      setLoading(false);
      console.log(signUpData);
      console.log("SignIn Data:", signUpData);
    }
  };


  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 5 }}>
        <form style={{ width: "100%" }} onSubmit={handleSignUpClick} >
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Sign Up
          </Typography>
          <TextField
            name="username"
            value={signUpData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Email"
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
            value={signUpData.password}
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
          <TextField
            select
            name="role"
            value={signUpData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Account Type"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                  borderRadius: 8,
                },
              },
            }}
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>

          {error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ borderRadius: 7, mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          </form>
          <Typography textAlign={"center"} sx={{ mt: 2 }}>
            Do you already have an account? <Link href="/Login">Sign in</Link>
          </Typography>
      </Box>
    </Container>
  );
}