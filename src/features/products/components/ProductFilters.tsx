import ProductSortSelect from "./ProductSortSelect"

type CategoryOption = { // filter category option shape
  slug: string
  name: string
}

type ProductFiltersProps = { // filter UI props from the page
  selectedCategory: string
  sortBy: string
  availableCategories: CategoryOption[]
  focusRingClass: string
  title?: string
  onCategoryChange: (nextCategory: string) => void
  onSortChange: (nextSort: string) => void
}

const ProductFilters = ({
  selectedCategory,
  sortBy,
  availableCategories,
  focusRingClass,
  title = "Filter & Sort",
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) => { // shared filter UI for desktop and mobile
  return (
    <div className="space-y-4">
      <h2 className="u-text-lg u-font-semibold mb-0">{title}</h2>
      <div className="space-y-2 u-text-sm">
        <fieldset>
          <legend className="mb-2 u-text-sm u-font-medium">Category</legend> {/* explicit group label */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              value=""
              checked={selectedCategory === ""}
              className={focusRingClass}
              onChange={() => onCategoryChange("")} // selecting "All" clears the category
            />
            All
          </label>

          {availableCategories.map((category) => ( // category option from API or fallback list
            <label key={category.slug} className="flex items-center gap-2">
              <input
                type="radio"
                name="cat"
                value={category.slug}
                checked={selectedCategory === category.slug}
                className={focusRingClass}
                onChange={() => onCategoryChange(category.slug)} // selecting a category updates page logic
              />
              {category.name}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="space-y-2">
        <label className="u-text-sm u-font-medium">Sort by</label>
        <ProductSortSelect
          value={sortBy}
          focusRingClass={focusRingClass}
          onChange={onSortChange} // bubble sort changes to page logic
        />
      </div>
    </div>
  )
}

export default ProductFilters
