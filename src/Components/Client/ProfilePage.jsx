import { Box, CssBaseline, Tabs, Tab, Grid, Paper, Avatar , Typography, Divider, Container, Link} from '@mui/material';
import { useState } from 'react';
import Header from './Header';
import ProfileInfoPage from './ProfileInfoPage';
import OrderHistory from './OrderHistory';
import WishList from './WishList';
import Basket from './Basket';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const handleBasketVisible = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  const handleOverlayClick = () => {
    setIsBasketVisible(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileInfoPage />;
      case 1:
        return <OrderHistory />;
      case 2:
        return <WishList />;
      default:
        return <ProfileInfoPage />;
    }
  };

  return (
    <div>
      <CssBaseline />
      <Header HandleClickBasketIcon={handleBasketVisible} />
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 3 }}>
        {/* Tabs for navigation */}
        
        <Container>
            <Box sx={{display:"flex"}}>
            <Avatar sx={{width:200,height:200}}  />
            <Box mt={10} ml={3} >
            <Typography>
            <Box
              sx={{
                display: "flex",
                width: "70vw",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0 }}>Client Name</h3>
            </Box>
            <Box sx={{pt:1,pl:2 }}>
               <FacebookIcon/>
               <WhatsAppIcon/>
               <TelegramIcon/>
               </Box>
          </Typography>
            </Box>
            </Box>       
        </Container>
                            <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 3 }}> 
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            justifyContent: 'flex-start',
            display: 'flex',
          }}
        >
          <Tab label="User Information" />
          <Tab label="Order History" />
          <Tab label="Wishlist" />
          
        </Tabs>
        <Divider variant='inset'/>
      </Box>
      </Box>
      <Box sx={{ p: 3 }}>{renderContent()}</Box>
      {isBasketVisible && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={handleOverlayClick}
          />
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'white',
              padding: 2,
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            <Basket />
          </Box>
        </>
      )}
    </div>
  );
};

export default ProfilePage;