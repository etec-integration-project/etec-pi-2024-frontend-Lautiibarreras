import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/data-display">Visualización de Datos</Link>
      <Link to="/data-form">Enviar Datos</Link>
    </nav>
  );
};

export default Navbar;
