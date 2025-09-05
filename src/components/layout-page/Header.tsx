import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, Info, ShoppingCart } from "lucide-react";
import { FiLogIn } from "react-icons/fi";
import LoginPage from "../../pages/Login";
import logoUrl from "../../assets/logos/logo.svg";
import { RootState } from "../../store/store";

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
      <button onClick={() => setIsDrawerOpen(true)} className="text-brand-black hover:text-brand-orange">
        <FiLogIn size={22} />
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
  `p-2 rounded-md transition ${isActive ? "bg-brand-orange text-white" : "hover:bg-gray-100"}`;

const NavbarIcons = () => {
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((sum, it: any) => sum + (it.quantity ?? 0), 0));
  const wishCount = useSelector((s: RootState) => s.wishlist.items.length);

  return (
    <div className="flex items-center gap-3">
      <NavLink to="/cart" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <span className="relative inline-flex">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full text-[10px] leading-none px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </span>
      </NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => getIconLinkClassName(isActive)}>
        <span className="relative inline-flex">
          <Heart size={20} />
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full text-[10px] leading-none px-1.5 py-0.5">
              {wishCount}
            </span>
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

