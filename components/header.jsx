import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="navbar">
      <a href="#home" className="nav-link">Home</a>
      <a href="#products" className="nav-link">Our Products</a>
      <a href="#about" className="nav-link">Contact Us</a>
    </header>
  );
};

export default Header;
