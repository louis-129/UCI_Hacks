import React from 'react';
import { useContext } from 'react';
import Context from './Context';

const Header = () => {
  const userData = useContext(Context);
  return (
    <header style={headerStyle}>
      <h1>Welcome to Sunshine Theme</h1>
      <nav>
        <ul style={navStyle}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#ffc107', // Orange footer background
  padding: '0px',
  textAlign: 'top',
  color: '#fff', // White text color
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100%'
};

const navStyle = {
  listStyleType: 'none',
  margin: '0',
  padding: '0',
};

export default Header;
