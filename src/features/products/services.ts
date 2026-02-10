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

const productSchema = z.object({ // runtime schema for Product
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

const productsResponseSchema = z.object({ // runtime schema for products endpoint
  products: z.array(productSchema),
})

const categoriesResponseSchema = z.array(z.string()) // categories endpoint returns slug list

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com' // configurable base URL
const endpoint = (path: string) => `${API_BASE}${path}`

export async function getProducts(signal?: AbortSignal): Promise<Product[]> { // fetch all products for catalog (abortable)
  const res = await fetch(endpoint("/products"), { signal }); // GET products endpoint with optional abort signal
  if (!res.ok) throw new Error("Failed to fetch products"); // surface request failures
  const json = await res.json(); // parse JSON response body
  return productsResponseSchema.parse(json).products; // validate and return products array
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
