type CategoryOption = { // filter category option shape
  slug: string
  name: string
}

type ProductFiltersProps = { // filter UI props from the page
  searchQuery: string
  selectedCategory: string
  sortBy: string
  availableCategories: CategoryOption[]
  focusRingClass: string
  title?: string
  onSearchChange: (nextQuery: string) => void
  onCategoryChange: (nextCategory: string) => void
  onSortChange: (nextSort: string) => void
}

const ProductFilters = ({
  searchQuery,
  selectedCategory,
  sortBy,
  availableCategories,
  focusRingClass,
  title = "Filter & Sort",
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) => { // shared filter UI for desktop and mobile
  return (
    <div className="space-y-4">
      <h2 className="u-text-lg u-font-semibold mb-0">{title}</h2>
      <div className="space-y-2">
        <label htmlFor="products-search" className="u-text-sm u-font-medium">Search</label>
        <input
          id="products-search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)} // bubble search changes to page logic
          placeholder="Search products..."
          className={`input-field ${focusRingClass}`}
        />
      </div>
      <form className="space-y-2 u-text-sm">
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
      </form>
      <div className="space-y-2">
        <label htmlFor="products-sort" className="u-text-sm u-font-medium">Sort by</label>
        <select
          id="products-sort"
          className={`input-field ${focusRingClass}`}
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)} // bubble sort changes to page logic
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
          <option value="title-asc">Title A-Z</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilters
