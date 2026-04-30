import { describe, expect, it } from 'vitest' // test helpers
import cartReducer, { addToCart, clearCart, removeFromCart, updateQuantity } from './cartSlice' // slice actions
import type { Product } from '@/features/products/services' // product type

const buildProduct = (overrides?: Partial<Product>): Product => ({ // base product builder
  id: 1,
  title: 'Sample',
  description: 'Sample description',
  price: 12,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: 'Brand',
  category: 'beauty',
  thumbnail: '',
  images: [],
  ...overrides,
})

describe('cartSlice', () => {
  it('adds a new item with quantity 1', () => {
    const initialState = { items: [] } // start empty
    const product = buildProduct({ id: 10 }) // new product
    const nextState = cartReducer(initialState, addToCart(product)) // run reducer
    expect(nextState.items).toHaveLength(1) // item added
    expect(nextState.items[0].quantity).toBe(1) // quantity starts at 1
  })

  it('increments quantity for existing item', () => {
    const product = buildProduct({ id: 2 }) // shared product
    const initialState = { items: [{ ...product, quantity: 1 }] } // already in cart
    const nextState = cartReducer(initialState, addToCart(product)) // add again
    expect(nextState.items[0].quantity).toBe(2) // quantity increases
  })

  it('removes item by id', () => {
    const product = buildProduct({ id: 3 }) // item to remove
    const initialState = { items: [{ ...product, quantity: 1 }] } // single item
    const nextState = cartReducer(initialState, removeFromCart(product.id)) // remove action
    expect(nextState.items).toHaveLength(0) // cart empty
  })

  it('updates quantity to the provided value', () => {
    const product = buildProduct({ id: 4 }) // item to update
    const initialState = { items: [{ ...product, quantity: 1 }] } // start qty 1
    const nextState = cartReducer(initialState, updateQuantity({ id: 4, quantity: 5 })) // set to 5
    expect(nextState.items[0].quantity).toBe(5) // quantity updated
  })

  it('clears all items', () => {
    const product = buildProduct({ id: 5 }) // sample item
    const initialState = { items: [{ ...product, quantity: 2 }] } // seeded cart
    const nextState = cartReducer(initialState, clearCart()) // clear action
    expect(nextState.items).toHaveLength(0) // cart cleared
  })
})
