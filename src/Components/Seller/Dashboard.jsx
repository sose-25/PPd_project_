import { Box, Tabs, Tab, Divider } from "@mui/material";
import { useContext } from "react";
import { TabContext } from "../../Context/TabContext";

export default function Dashboard() {
  const { activeTab, setActiveTab } = useContext(TabContext);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        <Tab label="Overview" />
        <Tab label="Order Management" />
        <Tab label="Product Management" />
      </Tabs>
      <Divider variant="inset" />
    </Box>
  );
}