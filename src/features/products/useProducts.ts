// src/features/products/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api'

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
