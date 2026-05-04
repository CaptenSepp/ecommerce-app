import { afterEach, describe, expect, it, vi } from 'vitest' // test helpers
import { getCategories, getLastProductsValidationWarnings, getProductById, getProducts } from './services' // service functions

afterEach(() => {
  vi.restoreAllMocks() // reset console spy
  vi.unstubAllGlobals() // cleanup fetch mock
})

describe('products services', () => {
  it('keeps usable products and stores validation warnings', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) // silence expected warning
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ // mock mixed API payload
      ok: true,
      json: async () => ({
        products: [
          { id: 1, title: 'Clean', description: 'Good', price: 10, discountPercentage: 0, rating: 4, stock: 5, brand: 'Brand', category: 'beauty', thumbnail: 'a.jpg', images: ['a.jpg'] },
          { id: 2, title: 99, description: 'Broken title', price: 20, discountPercentage: 0, rating: 4, stock: 5, brand: 'Brand', category: 'beauty', thumbnail: 'b.jpg', images: ['b.jpg'] },
        ],
      }),
    }))

    const products = await getProducts() // load and validate products

    expect(products).toHaveLength(2) // tolerant parsing keeps both items
    expect(products[1].title).toBe('Untitled product') // broken title gets fallback
    expect(getLastProductsValidationWarnings()).toHaveLength(1) // warning stored for debug
    expect(consoleErrorSpy).toHaveBeenCalled() // warning logged once
  })

  it('formats categories for the UI', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ // mock category payload
      ok: true,
      json: async () => (['smartphones', 'home-decoration']),
    }))

    const categories = await getCategories() // load category list

    expect(categories).toEqual([{ slug: 'smartphones', name: 'Smartphones' }, { slug: 'home-decoration', name: 'Home Decoration' }]) // formatted result
  })

  it('throws a clear error when one product is missing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false })) // mock failed details request
    await expect(getProductById(999)).rejects.toThrow('Product not found') // UI level error
  })
})
