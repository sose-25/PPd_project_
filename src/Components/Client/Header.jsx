import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../../APIs/SearchService';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = ({HandleClickBasketIcon}) => {
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const results = await searchProducts(query);
        console.log('Search Results:', results);

        navigate(`/Products?q=${query}`);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };
  return (
    <AppBar sx={{backgroundColor:"#023E8A"}} position="static">
      <Toolbar>
        {/* Logo on the left */}
        <Typography variant="h6" component="div">
          D9
        </Typography>

        {/* Navigation links on the left */}
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2 }}>
          <Button color="inherit" href="/Homepage">
            Home
          </Button>
          <Button color="inherit" href="/Products">
            Products
          </Button>
          <Button color="inherit" href="/Contact">
            Contact
          </Button>
        </Box>

        {/* Spacer to push the search bar and right-side links */}
        <Box sx={{ flexGrow: 1 }} />
        <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search…"
                    onKeyPress={handleKeyPress}
                    onChange={handleInputChange}
                    sx={{ width: '300px',backgroundColor:"white",borderRadius:"3px", marginRight: 2 }}
                    InputProp={{
                      startAdornment: (
                        <InputAdornment  position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
        {/* Navigation links on the right */}
        <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton onClick={HandleClickBasketIcon}>
      <ShoppingCartIcon sx={{color:"white"}} />
      <CartBadge badgeContent={1} color="primary" overlap="circular" />
    </IconButton>
          <IconButton href="/Profile" sx={{color:"white"}}>
            <PersonIcon/>
          </IconButton>
        </Box>
      </Toolbar>
      
    </AppBar>
    
  );
};

export default Header;