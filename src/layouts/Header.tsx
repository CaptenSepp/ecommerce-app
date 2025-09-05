import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, Info, ShoppingCart } from "lucide-react";
import { FiLogIn } from "react-icons/fi";
import LoginPage from "../pages/Login";
import logoUrl from "../assets/logos/logo.svg";
import { RootState } from "../app/store";

const Logo = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <NavLink to="/" end className="hover:opacity-60 transition-opacity duration-200">
        <img src={logoUrl} alt="Home" className="h-12" />
      </NavLink>
    </div>
  );
};

const getNavLinkClassName = (isActive: boolean) => `nav-link${isActive ? " nav-link-active" : ""}`;

// Shared icon-button style used by header icons
const getIconLinkClassName = (isActive: boolean) =>
  `p-2 rounded-md transition cursor-pointer ${
    isActive ? "bg-brand-orange text-white" : "text-brand-orange hover:bg-gray-100"
  }`;

const NavbarCategories = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <NavLink to="/products" className={({ isActive }) => getNavLinkClassName(isActive)}>
        Products
      </NavLink>

      <NavLink to="/about" className={({ isActive }) => getNavLinkClassName(isActive)}>
        About Us
      </NavLink>

      <NavLink to="/products?sale=1&sort=price-asc" className={({ isActive }) => getNavLinkClassName(isActive)}>
        Sale
      </NavLink>

      <form onSubmit={submitSearch} className="flex items-center gap-2">
        <input
          className="input-field"
          placeholder="Search products..."
          aria-label="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: 180 }}
        />
        <button type="submit" className="btn btn-secondary btn-sm">Search</button>
      </form>
    </div>
  );
};

const LoginDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className={getIconLinkClassName(isDrawerOpen)}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="login-drawer"
      >
        <FiLogIn size={20} />
      </button>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <aside
        id="login-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-4 right-4 text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-6 space-y-4">
          <LoginPage />
          <div>
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm"
              onClick={() => setIsDrawerOpen(false)}
            >
              Open Login Page
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavbarIcons = () => {
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((sum, it: any) => sum + (it.quantity ?? 0), 0));
  const wishCount = useSelector((s: RootState) => s.wishlist.items.length);

  return (
    <div className="flex items-center gap-3">
      <NavLink to="/cart" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <span className="relative inline-flex">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="badge-counter">{cartCount}</span>
          )}
        </span>
      </NavLink>

      <NavLink to="/wishlist" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <span className="relative inline-flex">
          <Heart size={20} />
          {wishCount > 0 && (
            <span className="badge-counter">{wishCount}</span>
          )}
        </span>
      </NavLink>

      <NavLink to="/about" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <Info size={20} />
      </NavLink>

      <LoginDrawer />
    </div>
  );
};

const Header = () => {
  return (
    <div className="border-b border-black">
      <header className="header">
        <div className="header__items">
          <Logo />
          <NavbarCategories />
          <NavbarIcons />
        </div>
      </header>
    </div>
  );
};

export default Header;
