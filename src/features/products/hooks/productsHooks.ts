// src/features/products/productsHooks.ts
import { useQuery } from '@tanstack/react-query'
import { getCategories, getProductById, getProducts, Product, Category } from '../api'

// list
export function useProducts() {
  console.log('query ran')
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,           // 5 Minuten "frisch"
    refetchOnMount: false,              // Kein Reload beim Zurückkommen
    refetchOnWindowFocus: false,        // Kein Reload bei Tabwechsel
    placeholderData: []
  })
}

// single
export function useProduct(id: number) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
    placeholderData: undefined,
  })
}

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: []
  })
}
