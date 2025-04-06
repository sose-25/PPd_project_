import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LogIn from './Components/Sign/LogIn';
import SignUp from './Components/Sign/SignUp';
import NotFound from './Components/NotFound';
import ForgetPassword from './Components/Sign/ForgetPassword';
import ResetPassword from './Components/Sign/ResetPassword';
import HomePage from './Components/Client/HomePage';
import ProfilePage from './Components/Client/ProfilePage';

export default function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/LogIn">Log In</Link> | <Link to="/SignUp">Sign Up</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Navigate to="/LogIn" />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}