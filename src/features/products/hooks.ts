// src/features/products/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, Product } from './api'

// list
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })
}

// single
export function useProduct(id: number) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<{ slug: string; name: string; url: string }[]> => {
      const res = await fetch('/api/categories')
      return res.json()
    }
  })
}

