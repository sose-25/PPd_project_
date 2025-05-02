import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Header from "./Header";
import ProductsSideBar from "./SideBar";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getProducts } from "../../../APIs/productsservice";

export default function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const searchQuery = queryParams.get("q"); 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); 
        console.log("API Response:", response); 
        if (response && Array.isArray(response.products)) {
          const processedProducts = response.products.flatMap((product) =>
            product.available_sellers.map((seller) => ({
              product_id: product.id,
              product_name: product.product_name,
              category: product.category,
              image_url: product.image_url,
              price: seller.price,
              condition: seller.condition_display,
              quantity: seller.quantity,
              proseller_id: seller.id,
            }))
          );
          setProducts(processedProducts); 
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

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]); 

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleProductClick = (product) => {
    const prosellerId = product.proseller_id; 
    if (!prosellerId) {
      alert("Seller information is missing!");
      return;
    }
    navigate(`/Product/${prosellerId}/`); 
  };

  const categories = ["All", "Engine", "Chassis", "Body", "Electronic System", "Interior"];

  const filteredByCategory =
    selectedCategory === "All"
      ? filteredProducts
      : filteredProducts.filter((product) => product.category === selectedCategory);

  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <ProductsSideBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <Container sx={{ mt: 4, flexGrow: 1 }}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
            <IconButton onClick={toggleFilterVisibility} sx={{ color: "black" }}>
              <TuneIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {filteredByCategory.length > 0 ? (filteredByCategory.map((product) => (
             <Grid
             item
             xs={12}
             sm={6}
             md={4}
             key={product.proseller_id}
           >
             <Box
               className="productcard"
               sx={{
                 width: "247px",
                 height: "300px",
                 background: "#F8F9FA",
                 borderRadius: "15px",
                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                 overflow: "hidden",
                 fontFamily: "'Nunito', sans-serif",
                 position: "relative",
                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
                 "&:hover": {
                   transform: "scale(1.03)",
                   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                 },
               }}
             >
               {/* Image Container */}
               <Box
                 className="image-container"
                 sx={{ position: "relative", width: "247px", height: "200px" }}
                 onClick={() => handleProductClick(product)}
               >
                 <img
                   src={product.image_url}
                   alt={product.product_name}
                   style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     borderTopLeftRadius: "15px",
                     borderTopRightRadius: "15px",
                     cursor: "pointer",
                   }}
                 />
                 {/* Heart Icon */}
                 <svg
                   className={`heart ${product.isFavorite ? "red" : ""}`}
                   viewBox="0 0 24 24"
                   style={{
                     position: "absolute",
                     top: "10px",
                     right: "10px",
                     width: "24px",
                     height: "24px",
                     fill: product.isFavorite ? "#DC3545" : "none",
                     stroke: product.isFavorite ? "#DC3545" : "#2C2C2C",
                     strokeWidth: "2",
                     cursor: "pointer",
                   }}
                   onClick={(e) => {
                     e.stopPropagation(); 
                     
                   }}
                 >
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                             2 6.5 3.5 5 5.5 5c1.54 0 3.04 1 3.57 2.36h1.87C13.46 6 
                             14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 
                             11.54L12 21.35z" />
                 </svg>
               </Box>
           
               {/* Info + Buttons */}
               <Box
                 className="info-buttons"
                 sx={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                   padding: "10px",
                 }}
               >
                 {/* Info */}
                 <Box className="info">
                   <Typography variant="h6" sx={{ fontSize: "14px", color: "#2C2C2C", margin: 0 }}>
                     {product.product_name}
                   </Typography>
                   <Typography className="price" sx={{ fontSize: "12px", color: "#2C2C2C", mt: "4px", mb: "2px" }}>
                     {product.price} DA
                   </Typography>
                   <Typography
                     className="availability1"
                     sx={{
                       fontSize: "12px",
                       color: product.condition === "New" ? "#28A745" : "#DC3545",
                       margin: 0,
                     }}
                   >
                     {product.condition === "New" ? "Disponible" : "Non Vendu"}
                   </Typography>
                 </Box>
           
                 {/* Buttons */}
                 <Box className="buttons" sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                   <button
                     className="buy-now"
                     style={{
                       width: "90px",
                       height: "20px",
                       fontSize: "12px",
                       fontWeight: "bold",
                       borderRadius: "20px",
                       backgroundColor: "#023E8A",
                       color: "#F8F9FA",
                       border: "none",
                       cursor: "pointer",
                     }}
                   >
                     Buy now
                   </button>
                   <button
                     className="add-to-cart"
                     style={{
                       width: "90px",
                       height: "20px",
                       fontSize: "12px",
                       fontWeight: "bold",
                       borderRadius: "20px",
                       backgroundColor: "#CCD8E8",
                       color: "#2C2C2C",
                       border: "none",
                       cursor: "pointer",
                     }}
                   >
                     Add to cart
                   </button>
                 </Box>
               </Box>
             </Box>
           </Grid>
           
            ))):(<Typography variant="h5" sx={{ textAlign: "center", width: "100%", mt: 25 }}>
              No products found.
            </Typography>)}
          </Grid>
        </Container>
      </Box>
      {isFilterVisible && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={toggleFilterVisibility}
          />
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              backgroundColor: "white",
              padding: 2,
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            <ProductsFiltering />
          </Box>
        </>
      )}
    </>
  );
}