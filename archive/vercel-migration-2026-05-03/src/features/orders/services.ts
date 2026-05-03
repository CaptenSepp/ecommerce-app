import type { Order, OrderCustomer } from './types' // order types
import type { Product } from '@/features/products/services' // product type for cart

type CartItem = Product & { quantity: number } // cart item shape

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000' // API base
const endpoint = (path: string) => `${API_BASE}${path}` // build full endpoint URL

export const createOrder = async (items: CartItem[], customer: OrderCustomer): Promise<Order> => { // create order via API
  const res = await fetch(endpoint('/orders'), { // request config
    method: 'POST', // HTTP method
    headers: { 'Content-Type': 'application/json' }, // JSON body
    body: JSON.stringify({ items, customer }), // payload
  }) // POST order payload
  if (!res.ok) throw new Error('Failed to create order') // handle error
  return res.json() as Promise<Order> // return order data
}

export const getOrders = async (userEmail: string): Promise<Order[]> => { // load orders via API
  const url = endpoint(`/orders?email=${encodeURIComponent(userEmail)}`) // build URL
  const res = await fetch(url) // GET orders
  if (!res.ok) throw new Error('Failed to fetch orders') // handle error
  return res.json() as Promise<Order[]> // return orders list
}
