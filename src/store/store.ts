// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '../features/cart/cartSlice'

import wishlistReducer from '../features/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
