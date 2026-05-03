import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../products/services'

interface CartItem extends Product { // cart item includes product data + quantity
  quantity: number
}

interface CartState { // slice state shape
  items: CartItem[]
}

const initialState: CartState = { // default empty cart
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(cartItem => cartItem.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1 // increase quantity if already in cart
      } else {
        state.items.push({ ...action.payload, quantity: 1 }) // otherwise add new line item
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(cartItem => cartItem.id !== action.payload) // remove by product id
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const targetItem = state.items.find(cartItem => cartItem.id === action.payload.id)
      if (targetItem) targetItem.quantity = action.payload.quantity // set explicit quantity
    },
    clearCart(state) {
      state.items = [] // drop all items
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions // action creators
export default cartSlice.reducer // reducer export
