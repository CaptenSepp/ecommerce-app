import { Link } from "react-router-dom"
import type { Product } from "@/features/products/services"
import { focusRingClass } from "./header-tools"

type SearchResultsProps = {
  isError: boolean
  isLoading: boolean
  normalizedQuery: string
  onSelect: () => void
  visibleResults: Product[]
}

const SearchResults = ({ isError, isLoading, normalizedQuery, onSelect, visibleResults }: SearchResultsProps) => (
  <div className="space-y-3">
    <div className="u-text-sm text-muted">Results</div>
    {isLoading && <div className="u-text-sm text-muted">Loading products...</div>}
    {isError && <div className="u-text-sm text-muted">Could not load products.</div>}
    {!isLoading && !isError && normalizedQuery && visibleResults.length === 0 && <div className="u-text-sm text-muted">No results found.</div>}
    {!isLoading && !isError && visibleResults.length > 0 && (
      <div className="space-y-3">
        {visibleResults.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className={`flex items-center gap-4 rounded-md border border-[color:var(--border-color)] p-3 hover:bg-gray-50 ${focusRingClass}`} onClick={onSelect}>
            <span className="media-thumb">
              <img src={product.thumbnail} alt={product.title} loading="lazy" className="media-thumb__img" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="truncate u-font-medium">{product.title}</span>
              <span className="u-text-sm text-muted">{product.brand}</span>
            </span>
            <span className="u-text-sm text-muted">${product.price}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
)

export default SearchResults
