import { afterEach, describe, expect, it, vi } from 'vitest' // test helpers
import { createOrder, getOrders } from '../services' // service functions
import type { Product } from '@/features/products/services' // product shape

const buildItem = (overrides?: Partial<Product & { quantity: number }>) => ({ // small cart item builder
  id: 1,
  title: 'Phone',
  description: 'Phone description',
  price: 99,
  discountPercentage: 0,
  rating: 4,
  stock: 10,
  brand: 'Brand',
  category: 'phones',
  thumbnail: '',
  images: [],
  quantity: 2,
  ...overrides,
})

afterEach(() => {
  vi.unstubAllGlobals() // cleanup fetch mock
})

describe('orders services', () => {
  it('sends order payload with POST and returns created order', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ // mock successful response
      ok: true,
      json: async () => ({ id: 'order_1', items: [], customer: { name: 'Ada', email: 'ada@example.com', address: 'Street 1' }, totals: { subtotal: 0, shipping: 0, total: 0 }, createdAt: '2026-05-04T00:00:00.000Z' }),
    })
    vi.stubGlobal('fetch', fetchMock) // replace global fetch

    const order = await createOrder([buildItem()], { name: 'Ada', email: 'ada@example.com', address: 'Street 1' }) // call service

    expect(fetchMock).toHaveBeenCalledWith('/api/orders', expect.objectContaining({ method: 'POST' })) // POST target
    expect(fetchMock).toHaveBeenCalledWith('/api/orders', expect.objectContaining({ body: JSON.stringify({ items: [buildItem()], customer: { name: 'Ada', email: 'ada@example.com', address: 'Street 1' } }) })) // payload
    expect(order.id).toBe('order_1') // created order returned
  })

  it('loads orders with encoded email', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ // mock list response
      ok: true,
      json: async () => ([{ id: 'order_2' }]),
    })
    vi.stubGlobal('fetch', fetchMock) // replace global fetch

    const orders = await getOrders('ada+test@example.com') // load one user list

    expect(fetchMock).toHaveBeenCalledWith('/api/orders?email=ada%2Btest%40example.com') // encoded email
    expect(orders).toEqual([{ id: 'order_2' }]) // service returns parsed list
  })

  it('throws when order creation fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false })) // mock failed response
    await expect(createOrder([buildItem()], { name: 'Ada', email: 'ada@example.com', address: 'Street 1' })).rejects.toThrow('Failed to create order') // surface service error
  })
})
