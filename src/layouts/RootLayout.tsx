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
          <p className="footer__note">Demo directory links shown for layout.</p>
          <div className="footer__links u-text-sm"> {/* 3-column link list */}
            <span className="footer__demo-link">Instagram</span>
            <span className="footer__demo-link">TikTok</span>
            <span className="footer__demo-link">Facebook</span>
            <span className="footer__demo-link">YouTube</span>
            <span className="footer__demo-link">Pinterest</span>
            <span className="footer__demo-link">X (Twitter)</span>
            <span className="footer__demo-link">About Us</span>
            <span className="footer__demo-link">Our Story</span>
            <span className="footer__demo-link">Careers</span>
            <span className="footer__demo-link">Press</span>
            <span className="footer__demo-link">Sustainability</span>
            <span className="footer__demo-link">Affiliates</span>
            <span className="footer__demo-link">Help Center</span>
            <span className="footer__demo-link">Contact Us</span>
            <span className="footer__demo-link">Order Tracking</span>
            <span className="footer__demo-link">Shipping</span>
            <span className="footer__demo-link">Returns</span>
            <span className="footer__demo-link">Warranty</span>
            <span className="footer__demo-link">Size Guide</span>
            <span className="footer__demo-link">Gift Cards</span>
            <span className="footer__demo-link">Store Locator</span>
            <span className="footer__demo-link">Wholesale</span>
            <span className="footer__demo-link">Rewards</span>
            <span className="footer__demo-link">Refer a Friend</span>
            <span className="footer__demo-link">FAQ</span>
            <span className="footer__demo-link">Privacy Policy</span>
            <span className="footer__demo-link">Terms of Service</span>
            <span className="footer__demo-link">Accessibility</span>
            <span className="footer__demo-link">Security</span>
            <span className="footer__demo-link">Blog</span>
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


