import { describe, expect, it } from 'vitest' // test helpers
import wishlistReducer, { clearWishlist, toggleWishlist } from '../wishlistSlice' // slice actions
import type { Product } from '@/features/products/services' // product type

const buildProduct = (overrides?: Partial<Product>): Product => ({ // product builder
  id: 1,
  title: 'Saved',
  description: 'Saved item',
  price: 20,
  discountPercentage: 0,
  rating: 5,
  stock: 5,
  brand: 'Brand',
  category: 'beauty',
  thumbnail: '',
  images: [],
  ...overrides,
})

describe('wishlistSlice', () => {
  it('adds an item when toggled on', () => {
    const initialState = { items: [] } // start empty
    const product = buildProduct({ id: 10 }) // sample product
    const nextState = wishlistReducer(initialState, toggleWishlist(product)) // toggle on
    expect(nextState.items).toHaveLength(1) // item added
  })

  it('removes an item when toggled off', () => {
    const product = buildProduct({ id: 11 }) // sample product
    const initialState = { items: [product] } // already saved
    const nextState = wishlistReducer(initialState, toggleWishlist(product)) // toggle off
    expect(nextState.items).toHaveLength(0) // item removed
  })

  it('clears all items', () => {
    const product = buildProduct({ id: 12 }) // sample product
    const initialState = { items: [product] } // seed wishlist
    const nextState = wishlistReducer(initialState, clearWishlist()) // clear action
    expect(nextState.items).toHaveLength(0) // wishlist cleared
  })
})
