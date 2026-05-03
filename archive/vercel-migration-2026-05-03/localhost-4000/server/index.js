import express from 'express' // web server framework
import cors from 'cors' // CORS middleware
import rateLimit from 'express-rate-limit' // basic rate limiting
import path from 'node:path' // path helpers
import { fileURLToPath } from 'node:url' // file URL helpers
import { readFile, writeFile, mkdir } from 'node:fs/promises' // file system promises

const app = express() // create Express app
const __filename = fileURLToPath(import.meta.url) // file path for current module
const __dirname = path.dirname(__filename) // directory path for current module
const dataDir = path.join(__dirname, 'data') // data directory path
const ordersFile = path.join(dataDir, 'orders.json') // orders storage file
const dummyBaseUrl = process.env.DUMMY_BASE_URL ?? 'https://dummyjson.com' // product API base

app.use(express.json()) // parse JSON request bodies
app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? true })) // allow configured frontend origin

const ordersLimiter = rateLimit({
  windowMs: 60_000, // 1 minute window
  max: 60, // limit to 60 requests per minute
}) // simple rate limit for orders

const ensureDataDir = async () => { // ensure data folder exists
  await mkdir(dataDir, { recursive: true }) // create folder if missing
}

const readOrdersStore = async () => { // load orders data
  try {
    const raw = await readFile(ordersFile, 'utf-8') // read orders JSON
    const parsed = JSON.parse(raw) // parse JSON
    if (!parsed || typeof parsed !== 'object') return {} // validate structure
    return parsed // return orders map
  } catch {
    return {} // fallback to empty store
  }
}

const writeOrdersStore = async (ordersByUser) => { // persist orders data
  await ensureDataDir() // ensure data directory exists
  const payload = JSON.stringify(ordersByUser, null, 2) // pretty JSON for demo
  await writeFile(ordersFile, payload, 'utf-8') // write file
}

const buildOrderId = () => `order_${Date.now()}` // simple demo id

const normalizeOrderItems = (items) => ( // normalize incoming cart items
  Array.isArray(items) ? items.map((item) => ({
    id: Number(item.id),
    title: String(item.title ?? ''),
    price: Number(item.price ?? 0),
    quantity: Number(item.quantity ?? 0),
  })) : []
)

const buildTotals = (items) => { // compute totals server-side
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0) // subtotal
  const shipping = items.length ? 4.99 : 0 // shipping rule
  const total = subtotal + shipping // total
  return { subtotal, shipping, total }
}

const proxyRequest = async (req, res, targetPath) => { // proxy helper
  try {
    const response = await fetch(`${dummyBaseUrl}${targetPath}`) // proxy fetch
    const body = await response.text() // read body as text
    res.status(response.status).send(body) // forward status and body
  } catch (error) {
    console.error('Proxy error:', error) // minimal logging
    res.status(502).json({ message: 'Upstream error' }) // bad gateway
  }
}

app.get('/health', (_req, res) => { // health check
  res.json({ ok: true }) // return ok response
})

app.get('/products', (req, res) => { // proxy products list
  proxyRequest(req, res, '/products') // forward to DummyJSON
})

app.get('/products/categories', (req, res) => { // proxy categories list
  proxyRequest(req, res, '/products/categories') // forward to DummyJSON
})

app.get('/products/:id', (req, res) => { // proxy product details
  proxyRequest(req, res, `/products/${req.params.id}`) // forward to DummyJSON
})

app.post('/orders', ordersLimiter, async (req, res) => { // create order
  const items = normalizeOrderItems(req.body?.items) // normalize items
  const customer = req.body?.customer ?? {} // read customer data
  const email = String(customer.email ?? '').toLowerCase() // normalize email

  if (!email) { // require email for user key
    return res.status(400).json({ message: 'Email is required.' }) // validation error
  }

  const order = {
    id: buildOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      name: String(customer.name ?? ''),
      email,
      address: String(customer.address ?? ''),
    },
    items,
    totals: buildTotals(items),
  } // build order record

  const ordersByUser = await readOrdersStore() // load existing orders
  const existing = Array.isArray(ordersByUser[email]) ? ordersByUser[email] : [] // current user list
  ordersByUser[email] = [order, ...existing] // prepend new order
  await writeOrdersStore(ordersByUser) // persist to file

  return res.status(201).json(order) // return created order
})

app.get('/orders', ordersLimiter, async (req, res) => { // list orders
  const email = String(req.query.email ?? '').toLowerCase() // email query
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' }) // validation error
  }
  const ordersByUser = await readOrdersStore() // load orders
  const orders = Array.isArray(ordersByUser[email]) ? ordersByUser[email] : [] // user orders
  return res.json(orders) // return orders list
})

const port = Number(process.env.PORT ?? 4000) // server port
app.listen(port, () => { // start server
  console.log(`Orders server listening on ${port}`) // startup log
})
