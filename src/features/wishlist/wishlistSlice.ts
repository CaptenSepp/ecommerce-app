import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../products/services'

interface WishlistState { // wishlist slice state
  items: Product[]
}

const initialState: WishlistState = { // default empty wishlist
  items: []
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const existingProduct = state.items.find(product => product.id === action.payload.id) // check if already saved
      if (existingProduct) {
        state.items = state.items.filter(product => product.id !== action.payload.id) // remove if exists
      } else {
        state.items.push(action.payload) // add if missing
      }
    },
    clearWishlist(state) {
      state.items = [] // clear all items
    }

  }
})

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions // action creators
export default wishlistSlice.reducer // reducer export
