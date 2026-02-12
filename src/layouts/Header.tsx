import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, Info, MapPin, Search, ShoppingCart } from "lucide-react";
import { FiLogIn } from "react-icons/fi";
import LoginPage from "@/pages/Login";
import logoUrl from "@/assets/logos/logo.svg";
import { RootState } from "@/app/store";
import { categoryCards } from "@/features/products/data/categories";
import { useProducts } from "@/features/products/hooks";

const Logo = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <NavLink to="/" end className="hover:opacity-60 transition-opacity duration-200">
        <img src={logoUrl} alt="Home" className="h-12" />
      </NavLink>
    </div>
  );
};

const getNavLinkClassName = (isActive: boolean) => `nav-link${isActive ? " nav-link-active" : ""}`; // active link class helper

const getIconLinkClassName = (isActive: boolean) => // shared icon-button style for header icons
  `p-2 rounded-md transition cursor-pointer ${
    isActive ? "bg-brand-orange text-white" : "text-brand-orange hover:bg-gray-100"
  }`;
const focusRingClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"; // visible keyboard focus

const NavbarCategories = () => {
  const location = useLocation(); // read current path and query

  const isOnProducts = location.pathname === "/products"; // active states based on URL
  const searchParams = new URLSearchParams(location.search); // parse query params
  const isSaleActive = isOnProducts && searchParams.get("sale") === "1"; // sale tab active
  const isProductsActive = isOnProducts && !isSaleActive; // products tab active

  return (
    <nav className="flex items-center gap-4 flex-wrap flex-1" aria-label="Primary navigation"> {/* nav landmark for keyboard/screen readers */}
      <div className="flex items-center gap-2">
        {/* Products with hover panel */}
        <div className="relative group pt-2">
          <Link to="/products" className={`${getNavLinkClassName(isProductsActive)} ${focusRingClass}`}>
            Products
          </Link>
          <div className="absolute left-0 top-full z-50 w-[min(90vw,640px)] rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity"> {/* open on keyboard focus too */}
            <div className="mb-2 text-sm text-[color:var(--text-muted)]">Shop by category</div>
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.slice(0, 4).map((c) => (
                <Link key={c.id} to={c.href} className={`flex items-center gap-3 rounded-md p-2 hover:bg-gray-100 ${focusRingClass}`}>
                  <img src={c.img} alt="" className="h-10 w-10 rounded object-cover" loading="lazy" />
                  <span className="font-medium">{c.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link to="/products" className={`text-sm text-brand-orange hover:underline ${focusRingClass}`}>View all products →</Link>
            </div>
          </div>
        </div>

        {/* About Us with hover panel */}
        <div className="relative group pt-2">
          <NavLink to="/about" className={({ isActive }) => `${getNavLinkClassName(isActive)} ${focusRingClass}`}>
            About Us
          </NavLink>
          <div className="absolute left-0 top-full z-50 w-80 rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity"> {/* open on keyboard focus too */}
            <p className="text-sm text-[color:var(--text-muted)]">
              Learn about our mission, quality standards, and team.
            </p>
            <div className="mt-3 flex gap-3">
              <Link to="/about" className={`btn btn-primary btn-sm ${focusRingClass}`}>Our Story</Link>
              <Link to="/login" className={`btn btn-secondary btn-sm ${focusRingClass}`}>Join</Link>
            </div>
          </div>
        </div>

        {/* Sale with hover panel */}
        <div className="relative group pt-2">
          <Link to="/products?sale=1&sort=price-asc" className={`${getNavLinkClassName(isSaleActive)} ${focusRingClass}`}>
            Sale
          </Link>
          <div className="absolute left-0 top-full z-50 w-[min(90vw,520px)] rounded-lg border border-[color:var(--border-color)] bg-white shadow-lg p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity"> {/* open on keyboard focus too */}
            <div className="mb-2 text-sm text-[color:var(--text-muted)]">Deals you might like</div>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/products?sale=1&sort=price-asc" className={`rounded-md p-2 hover:bg-gray-100 font-medium ${focusRingClass}`}>All Deals</Link>
              {categoryCards.slice(0, 3).map((c) => (
                <Link key={c.id} to={`${c.href}&sale=1&sort=price-asc`} className={`rounded-md p-2 hover:bg-gray-100 ${focusRingClass}`}>
                  {c.label} Deals
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};

const LoginDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // open/close state
  const openButtonRef = useRef<HTMLButtonElement | null>(null); // return focus to opener on close

  useEffect(() => { // close drawer with Escape key
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => { // restore keyboard focus after closing drawer
    if (!isDrawerOpen) openButtonRef.current?.focus();
  }, [isDrawerOpen]);

  return (
    <>
      <button
        type="button"
        ref={openButtonRef}
        onClick={() => setIsDrawerOpen(true)} // open drawer
        className={`${getIconLinkClassName(isDrawerOpen)} ${focusRingClass}`}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="login-drawer"
        aria-label="Open login drawer"
      >
        <FiLogIn size={20} />
      </button>

      {isDrawerOpen && ( // backdrop only when open
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
          type="button"
          onClick={() => setIsDrawerOpen(false)} // close drawer
          className={`absolute top-4 right-4 text-2xl ${focusRingClass}`}
          aria-label="Close login drawer"
        >
          ×
        </button>
        <div className="p-6 space-y-4">
          <LoginPage />
          <div>
            <NavLink
              to="/login"
              className={`btn btn-primary btn-sm ${focusRingClass}`}
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

const SearchDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // open/close state
  const [queryText, setQueryText] = useState(""); // local search text
  const openButtonRef = useRef<HTMLButtonElement | null>(null); // return focus after close
  const { data: products, isLoading, isError } = useProducts(); // load products list once

  useEffect(() => { // close drawer with Escape key
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => { // restore focus after close
    if (!isDrawerOpen) openButtonRef.current?.focus();
  }, [isDrawerOpen]);

  const normalizedQuery = queryText.trim().toLowerCase(); // normalize for matching
  const visibleResults = (products ?? []).filter((product) => { // filter by title and brand
    if (!normalizedQuery) return false; // hide results if no query
    const nameText = `${product.title} ${product.brand}`.toLowerCase(); // combined fields
    return nameText.includes(normalizedQuery);
  });

  return (
    <>
      <button
        type="button"
        ref={openButtonRef}
        onClick={() => setIsDrawerOpen(true)} // open drawer
        className={`${getIconLinkClassName(isDrawerOpen)} ${focusRingClass}`}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="search-drawer"
        aria-label="Open search drawer"
      >
        <Search size={20} />
      </button>

      {isDrawerOpen && ( // backdrop only when open
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <aside
        id="search-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)} // close drawer
          className={`absolute top-4 right-4 text-2xl ${focusRingClass}`}
          aria-label="Close search drawer"
        >
          ×
        </button>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="drawer-search" className="text-sm font-medium">Search</label> {/* accessible label for textarea */}
            <textarea
              id="drawer-search"
              className={`input-field mt-2 min-h-[90px] ${focusRingClass}`}
              placeholder="Search products..."
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)} // update query text
            />
          </div>
          <div className="space-y-3"> {/* result list block */}
            <div className="text-sm text-[color:var(--text-muted)]">Results</div> {/* section label */}
            {isLoading && (
              <div className="text-sm text-[color:var(--text-muted)]">Loading products...</div>
            )}
            {isError && (
              <div className="text-sm text-[color:var(--text-muted)]">Could not load products.</div>
            )}
            {!isLoading && !isError && normalizedQuery && visibleResults.length === 0 && (
              <div className="text-sm text-[color:var(--text-muted)]">No results found.</div>
            )}
            {!isLoading && !isError && visibleResults.length > 0 && (
              <div className="space-y-3"> {/* list of matching products */}
                {visibleResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className={`flex items-center gap-4 rounded-md border border-[color:var(--border-color)] p-3 hover:bg-gray-50 ${focusRingClass}`}
                    onClick={() => setIsDrawerOpen(false)} // close after navigation
                  >
                    <span className="media-thumb"> {/* image container */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy" // lazy-load small thumbnails
                        className="media-thumb__img"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1"> {/* text block */}
                      <span className="truncate font-medium">{product.title}</span>
                      <span className="text-sm text-[color:var(--text-muted)]">{product.brand}</span>
                    </span>
                    <span className="text-sm text-[color:var(--text-muted)]">${product.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

const NavbarIcons = () => {
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((sum, it) => sum + (it.quantity ?? 0), 0)); // total cart quantity
  const wishCount = useSelector((s: RootState) => s.wishlist.items.length); // wishlist count

  return (
    <div className="flex items-center gap-3">
      <SearchDrawer />

      <NavLink
        to="/retailers"
        aria-label="Open retailers map"
        className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}
      >
        <MapPin size={20} /> {/* gps-style icon for retailers */}
      </NavLink>

      <NavLink to="/cart" aria-label="Open cart" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="badge-counter">{cartCount}</span>
          )}
        </span>
      </NavLink>

      <NavLink to="/wishlist" aria-label="Open wishlist" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex">
          <Heart size={20} />
          {wishCount > 0 && (
            <span className="badge-counter">{wishCount}</span>
          )}
        </span>
      </NavLink>

      <NavLink to="/about" aria-label="Open about page" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <Info size={20} />
      </NavLink>

      <LoginDrawer />
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <header className="header"> {/* main header bar */}
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
