const globalOrdersStore = globalThis // shared memory for warm serverless instances

if (!globalOrdersStore.__ordersByUser) {
  globalOrdersStore.__ordersByUser = {} // create empty store on first load
}

const buildOrderId = () => `order_${Date.now()}` // simple demo id

const readOrdersStore = () => globalOrdersStore.__ordersByUser // read shared in-memory store

const normalizeOrderItems = (items) => ( // normalize incoming cart items
  Array.isArray(items) ? items.map((item) => ({
    id: Number(item.id),
    title: String(item.title ?? ''),
    price: Number(item.price ?? 0),
    quantity: Number(item.quantity ?? 0),
  })) : []
)

const buildTotals = (items) => { // compute totals server-side
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0) // subtotal
  const shipping = items.length ? 4.99 : 0 // shipping rule
  const total = subtotal + shipping // total
  return { subtotal, shipping, total }
}

const readJsonBody = (body) => { // support parsed and string bodies
  if (!body) return {} // fallback for empty body
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) // parse raw JSON string when needed
    } catch {
      return {} // fallback when body is invalid
    }
  }
  return body // already parsed by the platform
}

export default function handler(req, res) { // Vercel API route for orders
  if (req.method === 'GET') {
    const email = String(req.query.email ?? '').trim().toLowerCase() // normalize email query
    if (!email) return res.status(400).json({ message: 'Email is required.' }) // validate input

    const ordersByUser = readOrdersStore() // read current memory store
    const orders = Array.isArray(ordersByUser[email]) ? ordersByUser[email] : [] // read one customer list
    return res.status(200).json(orders) // return orders list
  }

  if (req.method === 'POST') {
    const body = readJsonBody(req.body) // normalize request body
    const items = normalizeOrderItems(body.items) // normalize items
    const customer = body.customer ?? {} // read customer object
    const email = String(customer.email ?? '').trim().toLowerCase() // normalize email

    if (!email) return res.status(400).json({ message: 'Email is required.' }) // require email for user key

    const order = {
      id: buildOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        name: String(customer.name ?? '').trim(),
        email,
        address: String(customer.address ?? '').trim(),
      },
      items,
      totals: buildTotals(items),
    } // build order record with old shape

    const ordersByUser = readOrdersStore() // read current memory store
    const existingOrders = Array.isArray(ordersByUser[email]) ? ordersByUser[email] : [] // read existing list
    ordersByUser[email] = [order, ...existingOrders] // prepend newest order
    return res.status(201).json(order) // return created order
  }

  res.setHeader('Allow', 'GET, POST') // tell clients which methods work
  return res.status(405).json({ message: 'Method not allowed.' }) // reject unsupported methods
}
