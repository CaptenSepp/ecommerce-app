// src/features/products/services.ts

export interface Product {
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

export interface Category {
  slug: string;
  name: string;
}

// fetches all products to show in the catalog (issuing GET to products endpoint)
export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products"); // send a GET request (issuing) to the products URL (endpoint)
  const json = await res.json(); // read the server answer as JSON (payload)
  return json.products as Product[]; // return only the array of items from the response (unwrap payload)
}

// fetches one product by its number (identifier) from the API (endpoint)
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`); // request a single product using its id (identifier)
  if (!res.ok) throw new Error("Product not found"); // if the server says not found, turn it into an error (propagate)
  return (await res.json()) as Product; // give back the product data (parsed payload)
}

// fetches raw category names (slugs) from DummyJSON and formats them to human-friendly names (category)
export async function getCategories(): Promise<Category[]> {
  const res = await fetch("https://dummyjson.com/products/categories"); // call the categories URL (endpoint)
  if (!res.ok) throw new Error("Failed to fetch categories"); // stop with an error if the request fails (error state)
  const list: string[] = await res.json(); // read the array of category keys (slugs) from the response (payload)
  return list.map((slug) => ({
    slug,
    name: slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "), // turn a slug like "home-decoration" into "Home Decoration" (formatting)
  }));
}
