import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">VOGUE<span className="gradient-text">&VEST</span></div>
        <ul className="nav-links">
          <li><a href="#hero">Inicio</a></li>
          <li><a href="#features">Colecciones</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
