// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '../features/cart/cartSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
import type { Product } from '../features/products/services'

// Safe localStorage helpers
function loadState<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

function saveState(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write failures
  }
}

type PreloadedCart = { items: (Product & { quantity: number })[] }
type PreloadedWishlist = { items: Product[] }

const preloadedCart = loadState<PreloadedCart>('cart')
const preloadedWishlist = loadState<PreloadedWishlist>('wishlist')

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  },
  preloadedState: {
    cart: (preloadedCart ?? undefined) as any,
    wishlist: (preloadedWishlist ?? undefined) as any
  }
})

// Persist selected slices
store.subscribe(() => {
  const state = store.getState()
  saveState('cart', state.cart)
  saveState('wishlist', state.wishlist)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
