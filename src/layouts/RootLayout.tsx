import React from "react";
import { NavLink } from "react-router-dom";
import Header from "@/layouts/Header";
import Main from "@/layouts/Main";
import AssistantFab from "@/components/ui/AssistantFab";
// footer uses solid background color (no image)

const Layout: React.FC = () => ( // app shell with header, main, footer
  <div className="layout">
    <Header /> {/* site header */}

    <Main /> {/* route outlet */}

    <Footer /> {/* site footer */}

    <AssistantFab /> {/* global floating assistant */}
  </div>
);

export default Layout;

const Footer: React.FC = () => ( // inlined footer layout
  <footer className="footer">
    <section className="footer__section w-full py-8"> {/* footer info section */}
      <div className="footer__content u-text-white"> {/* split footer content */}
        <div className="footer__lead"> {/* left column (1 of 2) */}
          <div>
            <p className="u-font-semibold">My E-commerce</p>
            <p className="u-text-sm opacity-90">123 Market Street, Suite 5</p>
            <p className="u-text-sm opacity-90">San Francisco, CA 94103</p>
            <p className="u-text-sm opacity-90">support@shop.example \a +1 (555) 123-4567</p>
            <p className="footer__hours u-text-sm opacity-75">Mon-Fri 9:00-18:00</p>
          </div>
        </div>
        <div className="footer__links-wrap"> {/* right column (1 of 2) */}
          <div className="footer__links u-text-sm"> {/* 3-column link list */}
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">TikTok</a>
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">YouTube</a>
            <a href="#" className="hover:underline">Pinterest</a>
            <a href="#" className="hover:underline">X (Twitter)</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Our Story</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">Sustainability</a>
            <a href="#" className="hover:underline">Affiliates</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Order Tracking</a>
            <a href="#" className="hover:underline">Shipping</a>
            <a href="#" className="hover:underline">Returns</a>
            <a href="#" className="hover:underline">Warranty</a>
            <a href="#" className="hover:underline">Size Guide</a>
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Store Locator</a>
            <a href="#" className="hover:underline">Wholesale</a>
            <a href="#" className="hover:underline">Rewards</a>
            <a href="#" className="hover:underline">Refer a Friend</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Security</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
        </div>
      </div>
    </section>
    <nav className="footer-nav"> {/* footer navigation links */}
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Products</NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Cart</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Wishlist</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>About</NavLink>
    </nav>
    <div className="footer__meta">&copy; {new Date().getFullYear()} My E-commerce</div>
  </footer>
);


