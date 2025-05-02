import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

export default function ProductsFiltering({ onFilter }) {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [condition, setCondition] = useState("");

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleApplyFilters = () => {
    onFilter({ priceRange, condition });
  };

  return (
    <Box sx={{ p: 3,display:"flex",flexDirection:"column",gap:"20px" }}>
      <Typography variant="h6" gutterBottom>
        Filter Products
      </Typography>

     
      <Box sx={{ mb: 3 ,minWidth:"200px",maxWidth:"400px"}}>
        <Typography variant="subtitle1">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500}
          step={10}
        />
        <Typography variant="body2">
          ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>

    
      <Box sx={{ mb: 3 }}>
        <FormControl>
          <FormLabel>Condition</FormLabel>
          <RadioGroup value={condition} onChange={handleConditionChange}>
            <FormControlLabel value="new" control={<Radio />} label="New" />
            <FormControlLabel value="used" control={<Radio />} label="Used" />
          </RadioGroup>
        </FormControl>
      </Box>

    
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
}