import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/layout-page/Header";
import Main from "../../components/layout-page/Main";

const Layout: React.FC = () => (
  <div className="layout">
    <Header />

    <Main />

    <Footer />
  </div>
);

export default Layout;

// Inlined footer from layout-page/Footer
const Footer: React.FC = () => (
  <footer className="footer">
    <nav className="footer-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
    © {new Date().getFullYear()} My E-commerce
  </footer>
);
