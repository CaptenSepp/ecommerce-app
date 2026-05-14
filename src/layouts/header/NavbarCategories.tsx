import { Link, useLocation } from "react-router-dom"
import { categoryCards } from "@/features/products/data/categories"
import { focusRingClass, getNavLinkClassName } from "./header-tools"
import SearchDrawer from "./SearchDrawer"

const dropdownClassName =
  "pointer-events-none fixed left-0 top-[calc(var(--header-total-h)-2.2rem)] z-50 hidden w-1/2 rounded-b-lg bg-[color:var(--brand-black)] p-4 shadow-lg invisible opacity-0 transition-opacity md:block group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 u-text-white" // shared desktop panel

const NavbarCategories = () => {
  const location = useLocation() // current path and query

  // The active state here uses both path and query values.
  // That lets "/products" and "/products?sale=1" light up different nav items.
  const isOnProducts = location.pathname === "/products" // products page check
  const searchParams = new URLSearchParams(location.search) // parse current query string
  const isSaleActive = isOnProducts && searchParams.get("sale") === "1" // sale tab state
  const isProductsActive = isOnProducts && !isSaleActive // normal products tab state

  return (
    <nav className="flex min-w-0 flex-1 items-center overflow-x-auto no-scrollbar" aria-label="Primary navigation">
      <div className="header-nav-bar flex min-w-max items-stretch gap-0 pr-0">
        {/* Each top-level item keeps its own dropdown content with it.
            That way hover and keyboard focus open the matching panel only. */}
        <div className="group relative flex items-stretch">
          <Link to="/products" className={`header-nav-bar__item header-nav-bar__link ${getNavLinkClassName(isProductsActive)} ${focusRingClass}`}>
            <span className="nav-link__label">Products</span>
          </Link>
          <div className={dropdownClassName}>
            <div className="mb-2 u-text-sm u-text-white-70">Shop by category</div>
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.slice(0, 4).map((card) => (
                <Link key={card.id} to={card.href} className={`flex items-center gap-3 rounded-md p-2 hover:bg-[color:var(--overlay-white-10)] ${focusRingClass}`}>
                  <img src={card.img} alt="" className="h-10 w-10 rounded object-cover" loading="lazy" />
                  <span className="u-font-medium">{card.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link to="/products" className={`u-text-sm text-brand-orange hover:underline ${focusRingClass}`}>View all products →</Link>
            </div>
          </div>
        </div>

        <div className="group relative flex items-stretch">
          <Link to="/products?sale=1&sort=price-asc" className={`header-nav-bar__item header-nav-bar__link ${getNavLinkClassName(isSaleActive)} ${focusRingClass}`}>
            <span className="nav-link__label">Best Deals</span>
          </Link>
          <div className={dropdownClassName}>
            <div className="mb-2 u-text-sm u-text-white-70">Deals you might like</div>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/products?sale=1&sort=price-asc" className={`rounded-md p-2 u-font-medium hover:bg-[color:var(--overlay-white-10)] ${focusRingClass}`}>All Deals</Link>
              {categoryCards.slice(0, 3).map((card) => (
                <Link key={card.id} to={`${card.href}&sale=1&sort=price-asc`} className={`rounded-md p-2 hover:bg-[color:var(--overlay-white-10)] ${focusRingClass}`}>
                  {card.label} Deals
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-2 shrink-0">
          <SearchDrawer />
        </div>
      </div>
    </nav>
  )
}

export default NavbarCategories
