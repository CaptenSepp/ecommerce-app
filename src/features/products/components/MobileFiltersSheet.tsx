import type { Category } from "@/features/products/services"
import { focusRingClass } from "@/features/products/products-page-tools"
import ProductFilters from "./ProductFilters"

type MobileFiltersSheetProps = {
  availableCategories: Category[]
  draftCategory: string
  draftSortBy: string
  onApply: () => void
  onCategoryChange: (nextCategory: string) => void
  onClose: () => void
  onSortChange: (nextSort: string) => void
}

const MobileFiltersSheet = ({
  availableCategories,
  draftCategory,
  draftSortBy,
  onApply,
  onCategoryChange,
  onClose,
  onSortChange,
}: MobileFiltersSheetProps) => (
  <div className="products-filters-sheet md:hidden">
    <button type="button" className="products-filters-sheet__backdrop" aria-label="Close filters" onClick={onClose} />
    <div className="products-filters-sheet__panel">
      <div className="products-filters-sheet__header">
        <h2 className="mb-0 u-text-lg u-font-semibold">Filter & Sort</h2>
        <div className="products-filters-sheet__header-actions">
          <button type="button" className={`btn btn-secondary btn-sm ${focusRingClass}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`btn btn-primary btn-sm ${focusRingClass}`} onClick={onApply}>Done</button>
        </div>
      </div>
      <ProductFilters selectedCategory={draftCategory} sortBy={draftSortBy} availableCategories={availableCategories} focusRingClass={focusRingClass} title="Filters" onCategoryChange={onCategoryChange} onSortChange={onSortChange} />
    </div>
  </div>
)

export default MobileFiltersSheet
