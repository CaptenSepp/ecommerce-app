// src/features/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../products/api'

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
      const exists = state.items.find(i => i.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
    }
  }
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
