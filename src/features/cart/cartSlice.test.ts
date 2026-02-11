import { describe, expect, it } from 'vitest' // Vitest test helpers
import cartReducer, { addToCart, clearCart, removeFromCart, updateQuantity } from '@/features/cart/cartSlice' // slice under test
import type { Product } from '@/features/products/services' // product type for fixtures

const baseProduct: Product = { // shared product fixture
  id: 101,
  title: 'Test Product',
  description: 'Fixture item',
  price: 12.5,
  discountPercentage: 0,
  rating: 4.5,
  stock: 20,
  brand: 'Test Brand',
  category: 'test',
  thumbnail: '',
  images: [],
}

describe('cartSlice addToCart', () => {
  it('adds a new item with quantity 1', () => {
    const state = cartReducer(undefined, addToCart(baseProduct)) // add once to empty cart
    expect(state.items).toHaveLength(1) // one line item expected
    expect(state.items[0].quantity).toBe(1) // quantity starts at 1
  })

  it('increments quantity when adding the same product twice', () => {
    const stateOnce = cartReducer(undefined, addToCart(baseProduct)) // add first time
    const stateTwice = cartReducer(stateOnce, addToCart(baseProduct)) // add second time
    expect(stateTwice.items).toHaveLength(1) // still one line item
    expect(stateTwice.items[0].quantity).toBe(2) // quantity increases to 2
  })
})

describe('cartSlice updateQuantity', () => {
  it('sets quantity for an existing item', () => {
    const state = cartReducer(undefined, addToCart(baseProduct)) // seed with one item
    const updated = cartReducer(state, updateQuantity({ id: baseProduct.id, quantity: 5 })) // set quantity
    expect(updated.items[0].quantity).toBe(5) // quantity updated
  })

  it('ignores updates for missing item id', () => {
    const state = cartReducer(undefined, addToCart(baseProduct)) // seed with one item
    const updated = cartReducer(state, updateQuantity({ id: 999, quantity: 2 })) // id not in cart
    expect(updated.items[0].quantity).toBe(1) // quantity unchanged
  })
})

describe('cartSlice remove and clear', () => {
  it('removes an item by id', () => {
    const withItem = cartReducer(undefined, addToCart(baseProduct)) // seed with one item
    const removed = cartReducer(withItem, removeFromCart(baseProduct.id)) // remove by id
    expect(removed.items).toHaveLength(0) // cart is empty
  })

  it('clears all items', () => {
    const withItem = cartReducer(undefined, addToCart(baseProduct)) // seed with one item
    const cleared = cartReducer(withItem, clearCart()) // clear all items
    expect(cleared.items).toHaveLength(0) // cart is empty
  })
})
