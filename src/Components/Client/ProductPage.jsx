import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./Header";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import Basket from "./Basket";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../APIs/productsservice";
import { createOrder } from "../../../APIs/cartservice";

export default function ProductPage() {
  const { proseller_id } = useParams(); // Get the proseller_id from the URL
  const [product, setProduct] = useState(null); // State to store the product details
  const [sellerDetails, setSellerDetails] = useState(null); // State to store seller-specific details
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility
  const [selectedImage, setSelectedImage] = useState(""); // State for the selected image
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts(); // Fetch all products
        if (response && Array.isArray(response.products)) {
          // Find the product containing the proseller_id
          const foundProduct = response.products.find((p) =>
            p.available_sellers.some(
              (seller) => seller.id === parseInt(proseller_id)
            )
          );

          if (foundProduct) {
            // Extract the seller-specific details
            const foundSeller = foundProduct.available_sellers.find(
              (seller) => seller.id === parseInt(proseller_id)
            );

            // Set the product and seller details
            setProduct(foundProduct);
            setSellerDetails(foundSeller);
            setSelectedImage(foundProduct.image_url || ""); // Set default image
          } else {
            console.error("Product with the specified proseller_id not found.");
          }
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [proseller_id]);

  const handleBasketVisible = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  const handleOverlayClick = () => {
    setIsBasketVisible(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the state
  };

  const handleChangeQuantity = (e) =>
    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1));

  const handleBuynow = async () => {
    const token = localStorage.getItem("token"); 
    const orderPayload = {
      items: [
        {
          product_seller_id: parseInt(proseller_id),
          quantity: quantity,
        },
      ],
    };
  
    try {
      const response = await createOrder(orderPayload,token);
      console.log("Order placed successfully:", response);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!product || !sellerDetails) {
    return <div>Loading...</div>; 
  }

  const customerReviews = [
    {
      id: 1,
      name: "John Doe",
      picture: "/images/john.jpg",
      review: "Amazing product!",
      description: "This product exceeded my expectations. The quality is top-notch.",
    },
    {
      id: 2,
      name: "Jane Smith",
      picture: "/images/jane.jpg",
      review: "Good value for money",
      description: "The product is worth the price. It works as advertised and has been very useful for me.",
    },
    {
      id: 3,
      name: "Michael Brown",
      picture: "/images/michael.jpg",
      review: "Satisfied with the purchase",
      description: "I am happy with this product. It does what it promises, and the customer service was excellent.",
    },
  ];

  const productImages = [
    "/images/product1.jpg",
  ]
  const handleAddtoCart = () =>{
    const cartItem = {
      proseller_id: parseInt(proseller_id), 
      product_name: product.product_name,
      price: sellerDetails.price,
      quantity: quantity, 
      image_url: product.image_url,
      condition: sellerDetails.condition_display,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItemIndex = existingCart.findIndex(
      (item) => item.proseller_id === cartItem.proseller_id
    );
  
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Item added to cart!");
  }
  return (
    <>
      <CssBaseline />
      <Header HandleClickBasketIcon={handleBasketVisible} />
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 2,
                textAlign: "center",
                marginBottom: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={selectedImage}
                alt="Thumbnail"
                style={{
                  width: "100%",
                  cursor: "pointer",
                  border:
                    selectedImage === product.image_url
                      ? "2px solid #000"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    border:
                      selectedImage === image
                        ? "2px solid #000"
                        : "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "40%" }, padding: 2 }}>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                mb: 2,
              }}
              variant="h4"
            >
              {product.product_name}
              <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                {sellerDetails.price || "N/A"} DA
              </Typography>
            </Typography>
            <Typography sx={{ fontSize: 15, mb: 2, color: "green" }}>
              {sellerDetails.condition_display || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.product_description || "N/A"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <TextField
                type="number"
                value={quantity}
                onChange={handleChangeQuantity}
                variant="outlined"
                sx={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#2C2C2C",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  flex: 1,
                  backgroundColor: "#CCD8E8",
                  color: "#2C2C2C",
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: "100%",
                backgroundColor: "#023E8A",
                color: "#F8F9FA",
                borderRadius: "20px",
                padding: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleBuynow}
            >
              Buy Now
            </Button>
            <Box
              sx={{
                mt: 2,
                backgroundColor: "#f9f9f9",
                padding: "5px 10px",
                borderRadius: 2,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Details
                </Typography>
                <IconButton
                  sx={{ color: "black" }}
                  onClick={toggleDetails}
                >
                  {showDetails ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </Box>
              {showDetails && (
                <Box
                  sx={{
                    mt: 2,
                    backgroundColor: "#f9f9f9",
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">There is no details for now !</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography
            textAlign="center"
            variant="h5"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            What Our Customer's Say
          </Typography>
          <Grid container spacing={4}>
            {customerReviews.map((review) => (
              <Grid item xs={12} sm={6} md={4} key={review.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: 1,
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Avatar
                    src={review.picture}
                    alt={review.name}
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto",
                      mb: 2,
                      border: "2px solid #ddd",
                      boxShadow: 1,
                    }}
                  />
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    {review.review}
                  </Typography>
                  <Typography variant="body2">
                    {review.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {isBasketVisible && (
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
            onClick={handleOverlayClick}
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
            <Basket />
          </Box>
        </>
      )}
    </>
  );
}
