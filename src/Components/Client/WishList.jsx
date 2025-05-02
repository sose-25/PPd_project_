import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Grid } from '@mui/material';

const WishList = () => {
  // Sample data for saved products
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: '/path/to/product1.jpg',
      description: 'This is a description of Product 1.',
    },
    {
      id: 2,
      name: 'Product 2',
      image: '/path/to/product2.jpg',
      description: 'This is a description of Product 2.',
    },
    {
      id: 3,
      name: 'Product 3',
      image: '/path/to/product3.jpg',
      description: 'This is a description of Product 3.',
    },
  ]);

  // Function to remove a product from the wishlist
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((product) => product.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      {wishlist.length === 0 ? (
        <Typography variant="body1">Your wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlist.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishList;