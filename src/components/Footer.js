import React from 'react';
import './Styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="#">Follow us on:</a>
        <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
      </div>
    </footer>
  );
}

export default Footer;
