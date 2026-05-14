type SortOption = { // simple sort option model
  value: string
  label: string
}

type ProductSortSelectProps = { // props from the filter form
  value: string
  focusRingClass: string
  onChange: (nextValue: string) => void
}

const sortOptions: SortOption[] = [ // shared sort options list
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating" },
  { value: "title-asc", label: "Title A-Z" },
]

const ProductSortSelect = ({ value, focusRingClass, onChange }: ProductSortSelectProps) => { // native select keeps keyboard behavior
  return (
    <select
      className={`sort-select ${focusRingClass}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {sortOptions.map((option) => ( // render native sort options
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default ProductSortSelect
