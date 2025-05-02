import React, { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SelectedOptionContext } from '../../Context/SelectedOptionContext';

const drawerWidth = 300;

const Navbar = () => {
  const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);
  

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Container sx={{ width: drawerWidth, height: "100vh" }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem
              button
              onClick={() => handleSelect("User Information")}
              sx={{
                backgroundColor: selectedOption === "User Information" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },cursor:"pointer"
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: selectedOption === "User Information" ? "black" : "gray" }} primary="User Information" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSelect("Order History")}
              sx={{
                backgroundColor: selectedOption === "Order History" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },cursor:"pointer"
              }}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: selectedOption === "Order History" ? "black" : "gray" }} primary="Order History" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleSelect("Wishlist")}
              sx={{
                backgroundColor: selectedOption === "Wishlist" ? "rgba(0, 0, 0, 0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },cursor:"pointer"
              }}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: selectedOption === "Wishlist" ? "black" : "gray" }} primary="Wishlist" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;