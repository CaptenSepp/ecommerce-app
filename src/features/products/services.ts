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

export async function getProducts(): Promise<Product[]> { // fetch all products for catalog
  const res = await fetch("https://dummyjson.com/products"); // GET products endpoint
  const json = await res.json(); // parse JSON response body
  return json.products as Product[]; // API returns products array
}

export async function getProductById(id: number): Promise<Product> { // fetch one product by id
  const res = await fetch(`https://dummyjson.com/products/${id}`); // request a single product by id
  if (!res.ok) throw new Error("Product not found"); // normalize not-found into error
  return (await res.json()) as Product; // response is the product object
}

export async function getCategories(): Promise<Category[]> { // fetch category slugs and format labels
  const res = await fetch("https://dummyjson.com/products/categories"); // categories endpoint
  if (!res.ok) throw new Error("Failed to fetch categories"); // surface failure explicitly
  const list: string[] = await res.json(); // list is an array of strings
  return list.map((slug) => ({ // map slugs to display labels
    slug,
    name: slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "), // turn a slug like "home-decoration" into "Home Decoration" (formatting)
  }));
}
