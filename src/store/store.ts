// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '../features/cart/cartSlice'

import wishlistReducer from '../features/wishlist/wishlistSlice'

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

const preloadedCart = loadState<{ items: unknown[] }>('cart')
const preloadedWishlist = loadState<{ items: unknown[] }>('wishlist')

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  },
  preloadedState: {
    cart: preloadedCart ?? undefined,
    wishlist: preloadedWishlist ?? undefined
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
