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
  
  // fetch list (default 30 items; you can add ?limit=100 etc.)
  export async function getProducts(): Promise<Product[]> {
    const res = await fetch('https://dummyjson.com/products')
    const json = await res.json()
    return json.products as Product[]          // array under `products` key :contentReference[oaicite:0]{index=0}
  }
  
  // fetch single by id
  export async function getProductById(id: number): Promise<Product> {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error('Product not found')
    return (await res.json()) as Product      // entire JSON is the product :contentReference[oaicite:1]{index=1}
  }
  