// src/features/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../products/services'

interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: []
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const existingProduct = state.items.find(product => product.id === action.payload.id)
      if (existingProduct) {
        state.items = state.items.filter(product => product.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
    },
    clearWishlist(state) {
      state.items = []
    }

  }
})

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
