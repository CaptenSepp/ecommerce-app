// src/features/products/api.ts

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

// fetch list
export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products') // fetches the list of products
  const json = await res.json()         // fetches the list of products  
  return json.products as Product[]          // entire JSON is the product list :contentReference[oaicite:1]{index=1}
}

// fetch single by id
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`) // fetch single product by id
  if (!res.ok) throw new Error('Product not found') // ensure product exists
  return (await res.json()) as Product     // entire JSON is the product :contentReference[oaicite:1]{index=1}
}


export async function getCategories(): Promise<{ slug: string; name: string; url: string }[]> {
  const res = await fetch('/api/categories')
  return res.json()
}

// // fetch categories
// export async function getCategories(): Promise<string[]> {
//   const res = await fetch('https://dummyjson.com/products/categories') // fetches the list of categories
//   return await res.json()                   // ensure the response is returned as a string array
// }
