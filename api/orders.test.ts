import { beforeEach, describe, expect, it, vi } from 'vitest' // test helpers
import handler from './orders' // Vercel route handler

type MockResponse = { // tiny response mock type
  status: ReturnType<typeof vi.fn>
  json: ReturnType<typeof vi.fn>
  setHeader: ReturnType<typeof vi.fn>
}

const createResponse = (): MockResponse => { // express-like response double
  const response = {} as MockResponse
  response.status = vi.fn().mockReturnValue(response) // allow chaining
  response.json = vi.fn().mockReturnValue(response) // capture body
  response.setHeader = vi.fn() // capture header changes
  return response
}

beforeEach(() => {
  ;(globalThis as typeof globalThis & { __ordersByUser?: Record<string, unknown> }).__ordersByUser = {} // reset shared memory
})

describe('orders api handler', () => {
  it('creates an order and returns it for the same email', () => {
    const createResponseMock = createResponse() // POST response capture
    handler({ method: 'POST', body: { items: [{ id: '7', title: 'Phone', price: '10', quantity: '2' }], customer: { name: 'Ada', email: 'ADA@example.com', address: 'Street 1' } } }, createResponseMock) // create order

    expect(createResponseMock.status).toHaveBeenCalledWith(201) // created status
    const createdOrder = createResponseMock.json.mock.calls[0][0] // first response payload
    expect(createdOrder.customer.email).toBe('ada@example.com') // email normalized
    expect(createdOrder.totals.total).toBeCloseTo(24.99, 2) // totals computed on server

    const listResponseMock = createResponse() // GET response capture
    handler({ method: 'GET', query: { email: 'ada@example.com' } }, listResponseMock) // load same user orders

    expect(listResponseMock.status).toHaveBeenCalledWith(200) // success status
    expect(listResponseMock.json.mock.calls[0][0]).toHaveLength(1) // one saved order
  })

  it('rejects requests without email', () => {
    const response = createResponse() // GET response capture
    handler({ method: 'GET', query: {} }, response) // missing email request
    expect(response.status).toHaveBeenCalledWith(400) // validation status
    expect(response.json).toHaveBeenCalledWith({ message: 'Email is required.' }) // validation message
  })

  it('rejects unsupported methods', () => {
    const response = createResponse() // unsupported method response
    handler({ method: 'DELETE' }, response) // invalid request method
    expect(response.setHeader).toHaveBeenCalledWith('Allow', 'GET, POST') // allowed methods header
    expect(response.status).toHaveBeenCalledWith(405) // method not allowed
  })
})
