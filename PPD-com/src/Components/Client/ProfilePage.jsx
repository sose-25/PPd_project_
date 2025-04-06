import React, { useState } from 'react';
import { Box, Typography, Container, Avatar, Grid, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header';
import ChangeProfileInfo from './ChangeProfileInfo';

const ProfilePage = () => {
  const [isChangeInfoVisible, setIsChangeInfoVisible] = useState(false);

  const handleChangeInfoVisible = () => {
    setIsChangeInfoVisible(!isChangeInfoVisible);
  };

  const handleOverlayClick = () => {
    setIsChangeInfoVisible(false);
  };

  const handleBoxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="md">
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar sx={{ width: 100, height: 100 }} src="/path/to/profile-image.jpg" alt="User Name" />
                </Grid>
                <Grid item xs>
                  <Typography variant="h4">User Name</Typography>
                  <Typography variant="body1">user@example.com</Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <IconButton onClick={handleChangeInfoVisible}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="body1">
                <strong>Full Name:</strong> User Name
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> user@example.com
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> 123 Main St, Anytown, USA
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
      {isChangeInfoVisible && (
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
            onClick={handleBoxClick}
          >
            <ChangeProfileInfo />
          </Box>
        </>
      )}
      
    </div>
  );
};

export default ProfilePage;