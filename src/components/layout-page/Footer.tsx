import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
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
};

export default Footer;
