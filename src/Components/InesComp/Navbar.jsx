import logo from '../../assets/logo.png'; 
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Styles.css';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  return (
    <main className='navbar '>
      <div className='left'>
        <img src={logo} alt="Logo" />

        <div className='nav-links'>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>

      <div className='right'>
        <div className="search-box">
          <FaSearch className="icon-blue" />
          <input type="text" placeholder="Search" />
        </div>

        <div className="icons">
          <FaShoppingCart className="icon-white" />
          <a href="/login">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
