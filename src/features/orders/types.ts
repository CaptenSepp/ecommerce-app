export type OrderItem = { // stored order line item
  id: number
  title: string
  price: number
  quantity: number
}

export type OrderCustomer = { // customer details captured at checkout
  name: string
  email: string
  address: string
}

export type OrderTotals = { // order totals snapshot
  subtotal: number
  shipping: number
  total: number
}

export type Order = { // persisted order shape
  id: string
  createdAt: string
  customer: OrderCustomer
  items: OrderItem[]
  totals: OrderTotals
}
