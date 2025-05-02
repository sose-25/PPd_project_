import { Container, Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Basket from "./Basket";
import { useState } from "react";
import React from 'react';
import Navbar from './../InesComp/Navbar'; 
import Hero from './../InesComp/Hero';
import CategoriesList from './../InesComp/CategoriesList';
import CommentersList from './../InesComp/CommentersList copy';
import FAQSection from './../InesComp/FAQSection';
import Footer  from './../InesComp/Footer';

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
    <CssBaseline />
      <Header HandleClickBasketIcon={handleBasketVisible} />
      <div>

<div className="full-width">
  
  <Hero />
</div>

<div style={{ display: 'flex', justifyContent: 'center' }}>
<h4 style={{ fontSize: '2rem', color: '#023E8A', margin: 20 }}>Categories:</h4>
</div>

<CategoriesList />


<div className="full-width">
  <FAQSection />
  <Footer />
</div>

</div>
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