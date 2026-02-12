import React from "react";
import { NavLink } from "react-router-dom";
import Header from "@/layouts/Header";
import Main from "@/layouts/Main";
// footer uses solid background color (no image)

const Layout: React.FC = () => ( // app shell with header, main, footer
  <div className="layout">
    <Header /> {/* site header */}

    <Main /> {/* route outlet */}

    <Footer /> {/* site footer */}
  </div>
);

export default Layout;

const Footer: React.FC = () => ( // inlined footer layout
  <footer className="footer">
    <section
      className="relative w-full min-h-80 py-10"
      style={{ backgroundColor: "var(--brand-black)" }} // solid footer background
    >

      {/* Subscribe form (top-left) */}
      <div className="absolute top-6 left-[clamp(1rem,3vw,4rem)] right-4 sm:right-auto">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}> {/* static subscribe form */}
          <input className="contact-input" type="text" placeholder="Your name" /> {/* name field */}
          <input className="contact-input" type="email" placeholder="Email address" /> {/* email field */}
          <button type="submit" className="btn btn-primary btn-sm">Subscribe</button> {/* submit button */}
        </form>
      </div>

      {/* Company info (bottom-left) */}
      <div className="absolute bottom-6 left-[clamp(1rem,3vw,4rem)] bg-black/40 text-white rounded-lg p-4 max-w-md backdrop-blur-sm">
        <p className="font-semibold">My E-commerce</p>
        <p className="text-sm opacity-90">123 Market Street, Suite 5</p>
        <p className="text-sm opacity-90">San Francisco, CA 94103</p>
        <p className="text-sm opacity-90">support@shop.example \a +1 (555) 123-4567</p>
        <p className="text-sm opacity-75 mt-1">Mon-Fri 9:00-18:00</p>
      </div>
    </section>
    <nav className="footer-nav"> {/* footer navigation links */}
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Products</NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Cart</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Wishlist</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>About</NavLink>
    </nav>
    � {new Date().getFullYear()} My E-commerce
  </footer>
);


