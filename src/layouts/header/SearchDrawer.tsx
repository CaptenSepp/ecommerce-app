import { Search } from "lucide-react"
import { useState } from "react"
import { useProducts } from "@/features/products/hooks"
import { focusRingClass, getIconLinkClassName } from "./header-tools"
import SearchResults from "./SearchResults"
import { useHeaderDrawer } from "./use-header-drawer"

const SearchDrawer = () => {
  const [queryText, setQueryText] = useState("") // local search text
  const { isDrawerOpen, openButtonRef, openDrawer, closeDrawer } = useHeaderDrawer() // shared drawer behavior
  const { data: products, isLoading, isError } = useProducts() // load product list once
  const normalizedQuery = queryText.trim().toLowerCase() // normalize user query
  const visibleResults = (products ?? []).filter((product) => normalizedQuery && `${product.title} ${product.brand}`.toLowerCase().includes(normalizedQuery))

  return (
    <>
      <button
        type="button"
        ref={openButtonRef}
        onClick={openDrawer}
        className={`${getIconLinkClassName(isDrawerOpen)} ${focusRingClass}`}
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
        <div className="space-y-4 p-6">
          <div>
            <label htmlFor="drawer-search" className="u-text-sm u-font-medium">Search</label>
            <textarea id="drawer-search" className={`input-field mt-2 min-h-[90px] ${focusRingClass}`} placeholder="Search products..." value={queryText} onChange={(event) => setQueryText(event.target.value)} />
          </div>
          <SearchResults isError={isError} isLoading={isLoading} normalizedQuery={normalizedQuery} onSelect={closeDrawer} visibleResults={visibleResults} />
        </div>
      </aside>
    </>
  )
}

export default SearchDrawer
