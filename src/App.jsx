import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from "./Components/Sign/LogIn";
import SignUp from './Components/Sign/SignUp';
import NotFound from './Components/NotFound';
import ForgetPassword from './Components/Sign/ForgetPassword';
import ResetPassword from './Components/Sign/ResetPassword';
import HomePage from './Components/Client/HomePage';
import ProfilePage from './Components/Client/ProfilePage';
import { SelectedOptionProvider } from './Context/SelectedOptionContext'; 
import ProductsPage from './Components/Client/ProductsPage';
import ProductPage from './Components/Client/ProductPage';
import Contact from './Components/Client/Contact';
import SellerDashboard from './Components/Seller/Profile';  
import { TabProvider } from './Context/TabContext';

export default function App() {
  return (
    <Router>
      <SelectedOptionProvider>
        <TabProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/LogIn" />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Homepage" element={<HomePage/>} />
        <Route path="/Profile" element={<ProfilePage />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/Products" element={<ProductsPage />} />   
        <Route path="/Product/:proseller_id/" element={<ProductPage />} />
        <Route path="/Contact" element={<Contact />} />   
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
      </Routes>
      </TabProvider>
      </SelectedOptionProvider>
    </Router>
    
  );
}