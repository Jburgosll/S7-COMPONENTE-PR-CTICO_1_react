import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="logo">VOGUE<span className="gradient-text">&VEST</span></span>
        <p>&copy; {new Date().getFullYear()} Vogue & Vest. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
