// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '../features/cart/slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
      // ← add other feature slices here
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
