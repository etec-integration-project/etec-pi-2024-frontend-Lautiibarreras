import React from 'react';
import './Styles/Header.css';

function Header() {
  return (
    <header className="navbar">
      <div className="logo">
        <h1>BRAZAVILLE</h1>
        <p>Coffee Roasting Co.</p>
      </div>
      <nav>
        <ul>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">OUR PRODUCTS</a></li>
          <li><a href="#">COMMUNITY</a></li>
          <li><a href="#">CONTACT US</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
