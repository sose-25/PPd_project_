import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {addProduct} from "../../../APIs/productsservice";
import {updateProduct} from "../../../APIs/productsservice";
import {deleteProduct} from "../../../APIs/productsservice";
import { getProducts } from "../../../APIs/productsservice";

export default function ProductManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const sellerid = localStorage.getItem('seller_id');
  const [currentProduct, setCurrentProduct] = useState({
    seller: sellerid, // Seller ID
    product_id: null, // Product ID
    product: 0, // Product name
    quantity: 0, // Stock quantity
    price: 0, // Product price
    condition: "new", // Product condition
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch data from the API
        if (response && Array.isArray(response.products)) {
          const sellerId = localStorage.getItem('seller_id'); // Get the signed-in seller's ID
  
          // Filter products for the signed-in seller
          const processedProducts = response.products.flatMap((product) =>
            product.available_sellers
              .filter((proseller) => proseller.seller.id === parseInt(sellerId)) // Match seller ID
              .map((proseller) => ({
                proseller_id: proseller.id,
                product_name: product.product_name,
                category: product.category,
                image_url: product.image_url,
                seller_id: proseller.seller.id,
                price: proseller.price,
                condition: proseller.condition_display,
                quantity: proseller.quantity,
              }))
          );
  
          setProducts(processedProducts); // Update the state with filtered products
        } else {
          console.error("Unexpected response format:", response);
          alert("Failed to load products. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Failed to load products. Please try again later.");
      }
    };
  
    fetchProducts();
  }, []);
  const [allProducts, setAllProducts] = useState([]);

useEffect(() => {
  const fetchAllProducts = async () => {
    try {
      const response = await getProducts(); // Use your API to get all products
      if (response && Array.isArray(response.products)) {
        setAllProducts(response.products);
      }
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  };
  fetchAllProducts();
}, []);
  const handleDialogOpen = (product = { 
    product_id: currentProduct.product_id,
    product: currentProduct.product,
    seller: sellerid,
    quantity: currentProduct.quantity,
    price: currentProduct.price,
    condition: currentProduct.condition,
  }) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

const handleDialogClose = () => {
  setOpenDialog(false);
  setCurrentProduct({
    product_id: null,
    product: 1,
    seller: sellerid,
    quantity: 0,
    price: 0,
    condition: "new",
  });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCurrentProduct({ ...currentProduct, [name]: value });
};
const handleSaveProduct = async () => {
  const payload = {
    seller: currentProduct.seller, 
    product: currentProduct.product, 
    quantity: currentProduct.quantity,
    price: currentProduct.price,
    condition: currentProduct.condition,
  };

  try {
    if (currentProduct.proseller_id) {
      console.log("Updating product with ID:", currentProduct.proseller_id);
      const response = await updateProduct(currentProduct.proseller_id, payload);
      console.log("Updated product:", response);
      alert("Product updated successfully!");
    } else{
      console.log("Adding new product");
      const response = await addProduct(payload);
      console.log("Added product:", response);
      alert("Product added successfully!");
    }
  } catch (error) {
    console.error("Failed to save product:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Something went wrong!");
  }

  handleDialogClose();
};

  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.proseller_id);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Product Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Add Product
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {Array.isArray(products) && products.map((product) => (
    <TableRow key={product.proseller_id}>
      <TableCell>{product.product_name}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.price} DA</TableCell>
      <TableCell>{product.condition}</TableCell>
      
      <TableCell>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteProduct(product)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{currentProduct.id ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Product</InputLabel>
  <Select
    name="product"
    value={currentProduct.product}
    onChange={handleInputChange}
    label="Product"
  >
    {allProducts.map((prod) => (
      <MenuItem key={prod.id} value={prod.id}>
        {prod.product_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<TextField
  label="Stock"
  name="quantity"
  type="number"
  value={currentProduct.quantity}
  onChange={handleInputChange}
  fullWidth
  sx={{ mb: 2 }}
/>
<TextField
  label="Price"
  name="price"
  type="number"
  value={currentProduct.price}
  onChange={handleInputChange}
  fullWidth
  sx={{ mb: 2 }}
/>
<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Condition</InputLabel>
  <Select
    name="condition"
    value={currentProduct.condition}
    onChange={handleInputChange}
  >
    <MenuItem value="new">New</MenuItem>
    <MenuItem value="used">Used</MenuItem>
  </Select>
</FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
  }
