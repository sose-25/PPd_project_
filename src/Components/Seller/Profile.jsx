import { Container } from "@mui/material";
import Dashboard from "./Dashboard";
import ProfileInformation from "./ProfileInfo";
import Overview from "./Overview";
import ProductManagement from "./Productmanagement";
import OrderManagement from "./Ordermanagement";
import { useContext, } from "react";
import { TabContext } from "../../Context/TabContext";
export default function SellerDashboard() {
    const { activeTab } = useContext(TabContext);
  return (
    <Container>
    <ProfileInformation/>
    <Dashboard />
    {activeTab === 0 && <Overview />}
    {activeTab === 1 && <OrderManagement />}
    {activeTab === 2 && <ProductManagement />}
    </Container>
  );
}