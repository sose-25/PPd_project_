import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from './App';
import './index.css';
const theme = createTheme({
  typography: {
    fontFamily: "Nunito, Arial, sans-serif", // Set Nunito as the default font
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent global styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);