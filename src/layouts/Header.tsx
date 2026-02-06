import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, Info, ShoppingCart } from "lucide-react";
import { FiLogIn } from "react-icons/fi";
import LoginPage from "@/pages/Login";
import logoUrl from "@/assets/logos/logo.svg";
import { RootState } from "@/app/store";
import { categoryCards } from "@/features/products/data/categories";

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
  const location = useLocation();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  // Active states based on search params for Products vs Sale
  const isOnProducts = location.pathname === "/products";
  const searchParams = new URLSearchParams(location.search);
  const isSaleActive = isOnProducts && searchParams.get("sale") === "1";
  const isProductsActive = isOnProducts && !isSaleActive;

  return (
    <div className="flex items-center gap-4 flex-wrap flex-1">
      <div className="flex items-center gap-2">
        {/* Products with hover panel */}
        <div className="relative group pt-2">
          <Link to="/products" className={getNavLinkClassName(isProductsActive)}>
            Products
          </Link>
          <div className="absolute left-0 top-full z-50 w-[min(90vw,640px)] rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
            <div className="mb-2 text-sm text-[color:var(--text-muted)]">Shop by category</div>
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.slice(0, 4).map((c) => (
                <Link key={c.id} to={c.href} className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-100">
                  <img src={c.img} alt="" className="h-10 w-10 rounded object-cover" loading="lazy" />
                  <span className="font-medium">{c.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link to="/products" className="text-sm text-brand-orange hover:underline">View all products →</Link>
            </div>
          </div>
        </div>

        {/* About Us with hover panel */}
        <div className="relative group pt-2">
          <NavLink to="/about" className={({ isActive }) => getNavLinkClassName(isActive)}>
            About Us
          </NavLink>
          <div className="absolute left-0 top-full z-50 w-80 rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
            <p className="text-sm text-[color:var(--text-muted)]">
              Learn about our mission, quality standards, and team.
            </p>
            <div className="mt-3 flex gap-3">
              <Link to="/about" className="btn btn-primary btn-sm">Our Story</Link>
              <Link to="/login" className="btn btn-secondary btn-sm">Join</Link>
            </div>
          </div>
        </div>

        {/* Sale with hover panel */}
        <div className="relative group pt-2">
          <Link to="/products?sale=1&sort=price-asc" className={getNavLinkClassName(isSaleActive)}>
            Sale
          </Link>
          <div className="absolute left-0 top-full z-50 w-[min(90vw,520px)] rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity">
            <div className="mb-2 text-sm text-[color:var(--text-muted)]">Deals you might like</div>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/products?sale=1&sort=price-asc" className="rounded-md p-2 hover:bg-gray-100 font-medium">All Deals</Link>
              {categoryCards.slice(0, 3).map((c) => (
                <Link key={c.id} to={`${c.href}&sale=1&sort=price-asc`} className="rounded-md p-2 hover:bg-gray-100">
                  {c.label} Deals
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={submitSearch} className="flex items-center gap-2 ml-auto">
        <input
          className="input-field"
          placeholder="Search products"
          aria-label="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: 220 }}
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
