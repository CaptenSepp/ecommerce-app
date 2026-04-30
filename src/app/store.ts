// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import authReducer, { type AuthUser } from '@/features/auth/authSlice'
import type { Product } from '@/features/products/services'
import { initDemoIfNeeded } from '@/app/demo' // seed demo data before loading state

// Safe localStorage helpers
initDemoIfNeeded() // ensure demo data is available for preloaded state

function loadState<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key) // read persisted JSON for key
    if (!raw) return undefined // missing key means no preloaded state
    return JSON.parse(raw) as T
  } catch {
    return undefined // parse/storage error falls back to undefined
  }
}

function saveState(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value)) // persist only serializable slices
  } catch { // ignore write failures
  }
}

// Shapes stored in localStorage
type PreloadedCart = { items: (Product & { quantity: number })[] }
type PreloadedWishlist = { items: Product[] }
type PreloadedAuth = { user: AuthUser | null }

// Load persisted slices (if any)
const preloadedCart = loadState<PreloadedCart>('cart') // load persisted cart if present
const preloadedWishlist = loadState<PreloadedWishlist>('wishlist') // load persisted wishlist if present
const preloadedAuth = loadState<PreloadedAuth>('auth') // demo-only auth fallback (localStorage)
// Always pass a complete preloaded state
const preloadedState: { cart: PreloadedCart; wishlist: PreloadedWishlist } = {
  cart: preloadedCart ?? { items: [] }, // default to empty cart
  wishlist: preloadedWishlist ?? { items: [] } // default to empty wishlist
}
const resolvedAuth: PreloadedAuth = preloadedAuth ?? { user: null } // default auth state

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer
  },
  preloadedState: { ...preloadedState, auth: resolvedAuth }
})

// Persist selected slices
store.subscribe(() => {
  const state = store.getState() // read current state snapshot
  saveState('cart', state.cart) // persist cart slice
  saveState('wishlist', state.wishlist) // persist wishlist slice
})

// Typed hooks and state helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
