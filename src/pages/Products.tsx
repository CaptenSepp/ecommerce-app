import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductFilters from "@/features/products/components/ProductFilters"
import MobileFiltersSheet from "@/features/products/components/MobileFiltersSheet"
import ProductsErrorState from "@/features/products/components/ProductsErrorState"
import ProductsGrid from "@/features/products/components/ProductsGrid"
import { useCategories, useProducts } from "@/features/products/hooks"
import { buildProductSearchParams, fallbackCategories, focusRingClass, getFilteredProducts, getSaleMode } from "@/features/products/products-page-tools"

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams() // URL is source of truth
  const categoryQueryParam = searchParams.get("cat") || "" // selected category from URL
  const searchQuery = searchParams.get("q") || "" // search text from URL
  const initialSort = searchParams.get("sort") || "relevance" // sort value from URL
  const saleMode = getSaleMode(searchParams.get("sale")) // allow 1 or true
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam) // live category state
  const [sortBy, setSortBy] = useState(initialSort) // live sort state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false) // mobile sheet toggle
  const [draftCategory, setDraftCategory] = useState(categoryQueryParam) // mobile draft category
  const [draftSortBy, setDraftSortBy] = useState(initialSort) // mobile draft sort
  const { data: products = [], isLoading: isProductsLoading, error: productsError, refetch: refetchProducts } = useProducts()
  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories()
  const availableCategories = categories.length > 0 ? categories : fallbackCategories // safe category list

  // Keep the local UI state in sync with the URL.
  // This matters because filters can also change from links or browser navigation.
  useEffect(() => setSelectedCategory(categoryQueryParam), [categoryQueryParam]) // keep local state synced
  useEffect(() => setSortBy(initialSort), [initialSort]) // keep sort synced too
  useEffect(() => setDraftCategory(categoryQueryParam), [categoryQueryParam]) // update mobile draft category
  useEffect(() => setDraftSortBy(initialSort), [initialSort]) // update mobile draft sort

  // While the mobile sheet is open, block page scrolling behind it.
  // That keeps the interaction focused on the filter panel itself.
  useEffect(() => {
    if (!isMobileFiltersOpen) return // do nothing when closed
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden" // stop background scrolling
    return () => { document.body.style.overflow = previousOverflow }
  }, [isMobileFiltersOpen])

  // Build the final list from the raw API data and the current filter state.
  // useMemo helps avoid repeating the full filter and sort work on unrelated renders.
  const filteredProducts = useMemo(() => getFilteredProducts({ products, saleMode, searchQuery, selectedCategory, sortBy }), [products, saleMode, searchQuery, selectedCategory, sortBy])
  const hasBlockingLoadFailure = (productsError || categoriesError) && products.length === 0 && categories.length === 0

  // Write the chosen filter state back into the URL so refresh and sharing still work.
  const updateParams = (category: string, sort: string) => setSearchParams(buildProductSearchParams({ category, query: searchQuery, saleMode, sort }))

  // Retry only the requests that failed instead of blindly re-running everything.
  const retryFailedQueries = () => { const retries: Promise<unknown>[] = []; if (productsError) retries.push(refetchProducts()); if (categoriesError) retries.push(refetchCategories()); if (retries.length === 0) retries.push(refetchProducts(), refetchCategories()); void Promise.all(retries) }

  // The mobile sheet edits draft values first, then copies them into the live page state only on Done.
  const applyMobileFilters = () => { setSelectedCategory(draftCategory); setSortBy(draftSortBy); updateParams(draftCategory, draftSortBy); setIsMobileFiltersOpen(false) }

  if (isProductsLoading || isCategoriesLoading) return <p role="status" aria-live="polite">Loading...</p>
  if (hasBlockingLoadFailure) return <ProductsErrorState errorMessage={productsError?.message || categoriesError?.message || "Failed to load data"} onRetry={retryFailedQueries} />

  return (
    <div className="px-4 py-8">
      <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
        <button type="button" className={`btn btn-secondary btn-sm ${focusRingClass}`} onClick={() => setIsMobileFiltersOpen(true)}>Filter & Sort</button>
        <div className="u-text-sm text-muted">{filteredProducts.length} results</div>
      </div>
      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 md:block" aria-label="Product filters">
          <ProductFilters selectedCategory={selectedCategory} sortBy={sortBy} availableCategories={availableCategories} focusRingClass={focusRingClass} title="Filter & Sort" onCategoryChange={(nextCategory) => { setSelectedCategory(nextCategory); updateParams(nextCategory, sortBy) }} onSortChange={(nextSort) => { setSortBy(nextSort); updateParams(selectedCategory, nextSort) }} />
        </aside>
        <ProductsGrid products={filteredProducts} />
      </div>
      {isMobileFiltersOpen && <MobileFiltersSheet availableCategories={availableCategories} draftCategory={draftCategory} draftSortBy={draftSortBy} onApply={applyMobileFilters} onCategoryChange={setDraftCategory} onClose={() => setIsMobileFiltersOpen(false)} onSortChange={setDraftSortBy} />}
    </div>
  )
}

export default ProductsPage
