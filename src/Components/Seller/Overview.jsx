import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Overview() {
    return(
        <Container sx={{ mt: 3 }}>
      {/* Sales Summary */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Sales Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Daily Revenue</Typography>
            <Typography variant="h4" color="primary">
              1,200 DA
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Weekly Revenue</Typography>
            <Typography variant="h4" color="primary">
              8,400 DA
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Monthly Revenue</Typography>
            <Typography variant="h4" color="primary">
              36,000 DA
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Order Statistics */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
        Order Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4" color="secondary">
              1,200
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Pending Orders</Typography>
            <Typography variant="h4" color="warning.main">
              150
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for zoom and shadow
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 6,
    },}}>
            <Typography variant="h6">Completed Orders</Typography>
            <Typography variant="h4" color="success.main">
              1,050
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
        Recent Activity
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          <ListItem>
            <ListItemText
              primary="Order #1234 has been completed"
              secondary="2 hours ago"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="New order #1235 has been placed"
              secondary="4 hours ago"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Order #1233 is pending"
              secondary="6 hours ago"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
    )
}