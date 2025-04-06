import { Container, Box } from "@mui/material";
import Header from "./Header";
import CategoriesCards from "./CategoriesCards";
import Basket from "./Basket";
import { useState } from "react";

export default function HomePage() {
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const handleBasketVisible = () => {
    setIsBasketVisible(!isBasketVisible);
  };

  const handleOverlayClick = () => {
    setIsBasketVisible(false);
  };

  return (
    <>
      <Header HandleClickBasketIcon={handleBasketVisible} />
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <CategoriesCards />
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