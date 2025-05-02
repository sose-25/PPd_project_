import React from "react";
import { Box, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

export default function ProductsSideBar({ categories, selectedCategory, onCategorySelect }) {
  return (
    <Box
      sx={{
        width: 250,
        flexShrink: 0,
        backgroundColor: "#0077B6",
        height: "100vh",
        borderRadius:5,mt:5,boxShadow:5
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{color:"white"}} noWrap>
          Categories
        </Typography>
      </Toolbar>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => onCategorySelect(category)}
            sx={{
              backgroundColor: selectedCategory === category ? "white" : "transparent",
              "&:hover": { backgroundColor: "#F0F0F0",color: "#0077B6"  },
              cursor: "pointer"
            }}
          >
            <ListItemText
              primary={category}
              sx={{ color: selectedCategory === category ? "#0077B6" : "White","&:hover": {color: "#0077B6"  } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}