import type { Category, Product } from "@/features/products/services"

export { focusRingClass } from "@/components/ui/focus-tools"

export const fallbackCategories: Category[] = [
  { slug: "beauty", name: "Beauty" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "furniture", name: "Furniture" },
  { slug: "groceries", name: "Groceries" },
] // fallback list when categories query is empty

export const getSaleMode = (saleValue: string | null) => {
  // Accept a couple of truthy URL formats so links do not have to match one exact string.
  const normalizedValue = (saleValue || "").toLowerCase()
  return normalizedValue === "1" || normalizedValue === "true"
}

export const buildProductSearchParams = ({
  category,
  query,
  saleMode,
  sort,
}: {
  category: string
  query: string
  saleMode: boolean
  sort: string
}) => {
  // Only write useful values into the URL.
  // This keeps the query string smaller and avoids storing defaults that change nothing.
  const nextParams: Record<string, string> = {}
  if (category) nextParams.cat = category
  if (query) nextParams.q = query
  if (sort && sort !== "relevance") nextParams.sort = sort // Skip the default sort so the URL shows only real user choices.
  if (saleMode) nextParams.sale = "1" // Preserve sale mode so the page can rebuild the same product list after refresh or sharing.
  return nextParams
}

export const getFilteredProducts = ({
  products,
  saleMode,
  searchQuery,
  selectedCategory,
  sortBy,
}: {
  products: Product[]
  saleMode: boolean
  searchQuery: string
  selectedCategory: string
  sortBy: string
}) => {
  // Narrow the list down step by step so each later pass works on fewer items.
  let list = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products
  const normalizedQuery = searchQuery.trim().toLowerCase() // Normalize once so every comparison uses the same lowercase, trimmed text.

  if (normalizedQuery) {
    // Search matches title and brand because users usually remember one of those, not the exact product name.
    list = list.filter((product) => (product.title ?? "").toLowerCase().includes(normalizedQuery) || (product.brand ?? "").toLowerCase().includes(normalizedQuery))
  }

  if (saleMode && list.length > 0) {
    // There is no real sale flag from the API here, so the page uses the cheapest items as the sale bucket.
    const sortedByPrice = [...list].sort((left, right) => left.price - right.price)
    list = sortedByPrice.slice(0, Math.max(1, Math.ceil(sortedByPrice.length * 0.2))) // Keep at least one product so sale mode never returns an empty list just because the catalog is small.
  }

  // Sort after filtering so the visible order is applied only to the products that will actually be shown.
  const sorted = [...list] // Copy first so the original query data is not mutated by Array.sort.
  if (sortBy === "price-asc") sorted.sort((left, right) => left.price - right.price)
  if (sortBy === "price-desc") sorted.sort((left, right) => right.price - left.price)
  if (sortBy === "rating-desc") sorted.sort((left, right) => right.rating - left.rating)
  if (sortBy === "title-asc") sorted.sort((left, right) => left.title.localeCompare(right.title))
  return sorted
}
