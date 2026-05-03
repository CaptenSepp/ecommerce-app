import { useEffect, useMemo, useRef, useState } from "react" // local dropdown behavior

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

const ProductSortSelect = ({ value, focusRingClass, onChange }: ProductSortSelectProps) => { // custom select for consistent styling
  const [isOpen, setIsOpen] = useState(false) // dropdown open/close state
  const wrapperRef = useRef<HTMLDivElement | null>(null) // wrapper ref for outside click close

  useEffect(() => { // close when user clicks outside the dropdown
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      const targetNode = event.target as Node | null // current clicked DOM node
      if (wrapperRef.current?.contains(targetNode ?? null)) return
      setIsOpen(false) // close when click is outside
    }

    window.addEventListener("mousedown", handlePointerDown) // desktop click close
    return () => window.removeEventListener("mousedown", handlePointerDown) // cleanup listener
  }, [isOpen])

  const selectedOption = useMemo(() => (
    sortOptions.find((option) => option.value === value) ?? sortOptions[0]
  ), [value]) // resolve label for the current selected value

  return (
    <div ref={wrapperRef} className="sort-select"> {/* wrapper for trigger + panel */}
      <button
        type="button"
        className={`sort-select__trigger ${focusRingClass}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)} // toggle options panel
      >
        <span className="sort-select__value">{selectedOption.label}</span>
        <span className="sort-select__chevron" aria-hidden="true">v</span>
      </button>

      {isOpen && ( // render panel only when opened
        <div className="sort-select__panel" role="listbox" aria-label="Sort by">
          {sortOptions.map((option) => {
            const isSelected = option.value === value // style current option differently

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`sort-select__option ${isSelected ? "sort-select__option--selected" : ""}`}
                onClick={() => { // apply sort and close dropdown
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductSortSelect
