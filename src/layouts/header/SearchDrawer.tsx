import { Search } from "lucide-react"
import { useState } from "react"
import { useProducts } from "@/features/products/hooks"
import { focusRingClass } from "./header-tools"
import SearchResults from "./SearchResults"
import { useHeaderDrawer } from "./use-header-drawer"

const dropdownClassName =
  "pointer-events-none fixed left-0 top-[calc(var(--header-total-h)-2rem)] z-50 hidden h-[calc(100vh-(var(--header-total-h)-2rem))] w-1/2 rounded-b-lg bg-[color:var(--brand-black)] p-4 shadow-lg invisible opacity-0 transition-opacity md:block group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 u-text-white" // shared desktop panel

const SearchDrawer = () => {
  const [queryText, setQueryText] = useState("") // local search text
  const { isDrawerOpen, openButtonRef, openDrawer, closeDrawer } = useHeaderDrawer() // shared drawer behavior
  const { data: products, isLoading, isError } = useProducts() // load product list once
  const normalizedQuery = queryText.trim().toLowerCase() // normalize user query
  const visibleResults = (products ?? []).filter((product) => normalizedQuery && `${product.title} ${product.brand}`.toLowerCase().includes(normalizedQuery))

  return (
    <>
      <div className="group relative hidden md:flex">
        <button
          type="button"
          className={`icon-button header-nav-bar__item header-nav-bar__icon transition cursor-pointer u-text-white ${focusRingClass}`}
          aria-haspopup="dialog"
          aria-controls="search-panel"
          aria-label="Open search panel"
        >
          <Search size={20} />
        </button>

        <div id="search-panel" className={dropdownClassName}>
          <div className="flex h-full min-h-0 flex-col gap-4">
            <div>
              <label htmlFor="header-search" className="u-text-sm u-font-medium">Search</label>
              <input id="header-search" type="text" className={`input-field mt-2 h-[36px] max-w-[260px] rounded-2xl py-0 ${focusRingClass}`} placeholder="Search products..." value={queryText} onChange={(event) => setQueryText(event.target.value)} />
            </div>
            <SearchResults isError={isError} isLoading={isLoading} normalizedQuery={normalizedQuery} onSelect={() => undefined} visibleResults={visibleResults} />
          </div>
        </div>
      </div>

      <button
        type="button"
        ref={openButtonRef}
        onClick={openDrawer}
        className={`icon-button header-nav-bar__item header-nav-bar__icon transition cursor-pointer md:hidden ${isDrawerOpen ? "bg-brand-orange u-text-white" : "u-text-white"} ${focusRingClass}`}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="search-drawer"
        aria-label="Open search drawer"
      >
        <Search size={20} />
      </button>

      {isDrawerOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" onClick={closeDrawer} />}

      <aside id="search-drawer" role="dialog" aria-modal="true" className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-lg transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button type="button" onClick={closeDrawer} className={`absolute right-4 top-4 u-text-2xl ${focusRingClass}`} aria-label="Close search drawer">×</button>
        <div className="flex h-full min-h-0 flex-col gap-4 p-6">
          <div>
            <label htmlFor="drawer-search" className="u-text-sm u-font-medium">Search</label>
            <input id="drawer-search" type="text" className={`input-field mt-2 h-[36px] max-w-[260px] rounded-2xl py-0 ${focusRingClass}`} placeholder="Search products..." value={queryText} onChange={(event) => setQueryText(event.target.value)} />
          </div>
          <SearchResults isError={isError} isLoading={isLoading} normalizedQuery={normalizedQuery} onSelect={closeDrawer} visibleResults={visibleResults} />
        </div>
      </aside>
    </>
  )
}

export default SearchDrawer
