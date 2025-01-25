import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Sunshine Theme. All rights reserved.</p>
      <nav>
        <ul style={navStyle}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#ffc107', // Orange footer background
  padding: '20px',
  textAlign: 'center',
  color: '#fff', // White text color
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%'
}

const navStyle = {
  listStyleType: 'none',
  padding: 0,
}

export default Footer;
