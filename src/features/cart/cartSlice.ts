import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../products/api'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(cartItem => cartItem.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(cartItem => cartItem.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const targetItem = state.items.find(cartItem => cartItem.id === action.payload.id)
      if (targetItem) targetItem.quantity = action.payload.quantity
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
