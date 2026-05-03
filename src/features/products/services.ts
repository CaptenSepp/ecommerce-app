import { z } from 'zod' // runtime validation for API payloads

// src/features/products/services.ts

export interface Product { // product data from DummyJSON
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Category { // category model used for filters
  slug: string;
  name: string;
}

const strictProductSchema = z.object({ // strict schema used only to report data-quality warnings
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
})

const productSchema = z.object({ // tolerant runtime schema keeps app working even with partial API fields
  id: z.number(),
  title: z.string().catch("Untitled product"),
  description: z.string().catch(""),
  price: z.number().catch(0),
  discountPercentage: z.number().catch(0),
  rating: z.number().catch(0),
  stock: z.number().catch(0),
  brand: z.string().catch("Unknown brand"),
  category: z.string().catch("uncategorized"),
  thumbnail: z.string().catch(""),
  images: z.array(z.string()).catch([]),
})

const productsResponseSchema = z.object({ // lightweight shape check for products endpoint
  products: z.array(z.unknown()),
})

const categoriesResponseSchema = z.array(z.string()) // categories endpoint returns slug list

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com' // configurable base URL
const endpoint = (path: string) => `${API_BASE}${path}`
let lastProductsValidationWarnings: string[] = [] // keeps latest non-blocking product validation issues

export const getLastProductsValidationWarnings = () => lastProductsValidationWarnings // read latest product validation warnings

export async function getProducts(signal?: AbortSignal): Promise<Product[]> { // fetch all products for catalog (abortable)
  const res = await fetch(endpoint("/products"), { signal }); // GET products endpoint with optional abort signal
  if (!res.ok) throw new Error("Failed to fetch products"); // surface request failures
  const json = await res.json(); // parse JSON response body
  const parsed = productsResponseSchema.parse(json) // validate top-level response shape

  const warnings: string[] = [] // collect per-item validation warnings without breaking the app
  const products: Product[] = [] // keep valid/sanitized products

  parsed.products.forEach((raw, index) => {
    const strictParsed = strictProductSchema.safeParse(raw) // strict parse keeps strong validation diagnostics
    if (strictParsed.success) {
      products.push(productSchema.parse(strictParsed.data))
      return
    }

    warnings.push(`[product index ${index}] ${JSON.stringify(strictParsed.error.issues)}`) // detailed strict validation error

    const tolerantParsed = productSchema.safeParse(raw) // tolerant parse keeps UI functional
    if (tolerantParsed.success) {
      products.push(tolerantParsed.data)
      warnings.push(`[product index ${index}] used fallback defaults to keep app running`) // explain non-blocking fallback
      return
    }

    warnings.push(`[product index ${index}] dropped item (unrecoverable): ${JSON.stringify(tolerantParsed.error.issues)}`) // item skipped only if unrecoverable
  })

  lastProductsValidationWarnings = warnings // expose latest warnings to UI
  if (warnings.length > 0) {
    console.error("[products] Non-blocking API validation warnings:", warnings) // developer-facing diagnostics
  }

  return products
}

export async function getProductById(id: number, signal?: AbortSignal): Promise<Product> { // fetch one product by id (abortable)
  const res = await fetch(endpoint(`/products/${id}`), { signal }); // request a single product by id with optional abort signal
  if (!res.ok) throw new Error("Product not found"); // normalize not-found into error
  return productSchema.parse(await res.json()); // validate and return product object
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> { // fetch category slugs and format labels (abortable)
  const res = await fetch(endpoint("/products/categories"), { signal }); // categories endpoint with optional abort signal
  if (!res.ok) throw new Error("Failed to fetch categories"); // surface failure explicitly
  const list = categoriesResponseSchema.parse(await res.json()); // validate slug list
  return list.map((slug) => ({ // map slugs to display labels
    slug,
    name: slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "), // turn a slug like "home-decoration" into "Home Decoration" (formatting)
  }));
}
