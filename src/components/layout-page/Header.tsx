import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, Info, ShoppingCart } from "lucide-react";
import { FiLogIn } from "react-icons/fi";
import LoginPage from "../../pages/Login";
import logoUrl from "../../assets/logos/logo.svg";

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

const NavbarCategories = () => {
  return (
    <div>
      <NavLink to="/products" className={({ isActive }) => getNavLinkClassName(isActive)}>
        Products
      </NavLink>
    </div>
  );
};

const LoginDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsDrawerOpen(true)} className="">
        <FiLogIn size={22} color="red" />
      </button>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      <aside
        className={`fixed right-0 top-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ${
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
        <div className="p-6">
          <LoginPage />
        </div>
      </aside>
    </>
  );
};

const getIconLinkClassName = (isActive: boolean) =>
  `p-2 rounded-md transition ${isActive ? "bg-brand-navy text-white" : "hover:bg-gray-100"}`;

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-3">
      <NavLink to="/cart" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <ShoppingCart size={20} />
      </NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <Heart size={20} />
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

