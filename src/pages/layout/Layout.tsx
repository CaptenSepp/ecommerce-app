import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/layout-page/Header";
import Main from "../../components/layout-page/Main";
import heroImg from "../../assets/images/fragrances-hero.jpg";

const Layout: React.FC = () => (
  <div className="layout">
    <Header />

    <Main />

    <PreFooter />
    <Footer />
  </div>
);

export default Layout;

const PreFooter: React.FC = () => (
  <section
    className="relative w-full min-h-80 py-10"
    style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" aria-hidden="true" />

    {/* Subscribe form (top-left), viewport-anchored with responsive offset */}
    <div className="absolute top-6 left-[clamp(1rem,3vw,4rem)] right-4 sm:right-auto">
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input className="contact-input" type="text" placeholder="Your name" />
        <input className="contact-input" type="email" placeholder="Email address" />
        <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
      </form>
    </div>

    {/* Company info (bottom-left), viewport-anchored */}
    <div className="absolute bottom-6 left-[clamp(1rem,3vw,4rem)] bg-black/40 text-white rounded-lg p-4 max-w-md backdrop-blur-sm">
      <p className="font-semibold">My E-commerce</p>
      <p className="text-sm opacity-90">123 Market Street, Suite 5</p>
      <p className="text-sm opacity-90">San Francisco, CA 94103</p>
      <p className="text-sm opacity-90">support@shop.example • +1 (555) 123-4567</p>
      <p className="text-sm opacity-75 mt-1">Mon–Fri 9:00–18:00</p>
    </div>
  </section>
);

// Inlined footer from layout-page/Footer
const Footer: React.FC = () => (
  <footer className="footer">
    <nav className="footer-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Products</NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Cart</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Wishlist</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>About</NavLink>
    </nav>
    © {new Date().getFullYear()} My E-commerce
  </footer>
);


