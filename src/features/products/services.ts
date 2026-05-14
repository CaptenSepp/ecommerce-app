import { categoriesResponseSchema, formatCategoryLabel, productSchema, productsResponseSchema, strictProductSchema } from "./product-service-tools"

export interface Product {
  id: number; title: string; description: string; price: number; discountPercentage: number; rating: number; stock: number; brand: string; category: string; thumbnail: string; images: string[];
}

export interface Category {
  slug: string
  name: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "https://dummyjson.com" // Allow an env override so the same service can point to another backend without code changes.
const endpoint = (path: string) => `${API_BASE}${path}` // Build endpoints in one place so every request uses the same base URL rules.
const outOfStockProductIds = new Set([2, 7, 11, 16, 21, 26, 31, 36, 41, 46]) // Demo out-of-stock products.
let lastProductsValidationWarnings: string[] = [] // Keep the latest data-quality warnings available for debugging without stopping the app.

export const getLastProductsValidationWarnings = () => lastProductsValidationWarnings

const applyDemoStock = (product: Product): Product => {
  if (!outOfStockProductIds.has(product.id)) return product // Keep normal API stock for most products.
  return { ...product, stock: 0 } // Force selected demo products to be out of stock.
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(endpoint("/products"), { signal })
  if (!response.ok) throw new Error("Failed to fetch products")
  const parsed = productsResponseSchema.parse(await response.json())
  const warnings: string[] = []
  const products: Product[] = []

  // Try strict validation first so broken API data is visible during development.
  // If that fails, try the tolerant schema so the page can still use the parts that are safe enough.
  parsed.products.forEach((rawProduct, index) => {
    const strictParsed = strictProductSchema.safeParse(rawProduct)
    if (strictParsed.success) return void products.push(productSchema.parse(strictParsed.data)) // Even after strict success, run the shared product schema so every item leaves this service in one consistent final shape.
    warnings.push(`[product index ${index}] ${JSON.stringify(strictParsed.error.issues)}`)
    const tolerantParsed = productSchema.safeParse(rawProduct)
    if (tolerantParsed.success) return void products.push(tolerantParsed.data) // Keep partially usable items instead of dropping the whole catalog because one field was messy.
    warnings.push(`[product index ${index}] dropped item (unrecoverable): ${JSON.stringify(tolerantParsed.error.issues)}`)
  })

  // Save warnings for debugging, but do not block the page if enough product data survived.
  lastProductsValidationWarnings = warnings
  if (warnings.length > 0) console.error("[products] Non-blocking API validation warnings:", warnings)
  return products.map(applyDemoStock)
}

export async function getProductById(id: number, signal?: AbortSignal): Promise<Product> {
  const response = await fetch(endpoint(`/products/${id}`), { signal })
  if (!response.ok) throw new Error("Product not found") // Turn a bad API response into one clear UI-level error message for the details page.
  return applyDemoStock(productSchema.parse(await response.json()))
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await fetch(endpoint("/products/categories"), { signal })
  if (!response.ok) throw new Error("Failed to fetch categories")
  // Convert API slugs into ready-to-render label objects here so the UI does not have to repeat that mapping.
  return categoriesResponseSchema.parse(await response.json()).map((slug) => ({ slug, name: formatCategoryLabel(slug) }))
}
