import { defineConfig } from 'vite' // base Vite config helper
import { fileURLToPath, URL } from 'node:url' // path helpers for aliases
import react from '@vitejs/plugin-react' // react plugin for Vite
import tailwindcss from '@tailwindcss/vite'; // tailwind plugin for Vite
import type { IncomingMessage, ServerResponse } from 'node:http' // dev API request types

type DevOrder = {
  id: string
  createdAt: string
  customer: { name: string; email: string; address: string }
  items: { id: number; title: string; price: number; discountPercentage: number; quantity: number }[]
  totals: { subtotal: number; shipping: number; total: number }
}

const devOrdersByUser: Record<string, DevOrder[]> = {} // local dev memory store

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'shopella-dev-orders-api',
      configureServer(server) {
        server.middlewares.use('/api/orders', async (req, res) => {
          const body = await readRequestBody(req) // read POST JSON for local dev
          const url = new URL(req.url ?? '', 'http://localhost') // read query safely
          handleDevOrders(req, res, url, body) // answer like the Vercel API route
        })
      },
    },
  ], // app plugins
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // src alias
    },
  },
})

const readRequestBody = async (req: IncomingMessage) => {
  const chunks: Buffer[] = [] // collect request chunks
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  const rawBody = Buffer.concat(chunks).toString('utf8') // convert body to text
  try { return rawBody ? JSON.parse(rawBody) : {} } catch { return {} }
}

const sendJson = (res: ServerResponse, status: number, data: unknown) => {
  res.statusCode = status // set HTTP status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data)) // send JSON body
}

const handleDevOrders = (req: IncomingMessage, res: ServerResponse, url: URL, body: any) => {
  if (req.method === 'GET') {
    const email = String(url.searchParams.get('email') ?? '').trim().toLowerCase() // user key
    if (!email) return sendJson(res, 400, { message: 'Email is required.' })
    return sendJson(res, 200, devOrdersByUser[email] ?? []) // return user orders
  }

  if (req.method === 'POST') {
    const customer = body.customer ?? {} // checkout customer
    const email = String(customer.email ?? '').trim().toLowerCase()
    if (!email) return sendJson(res, 400, { message: 'Email is required.' })
    const items = normalizeDevOrderItems(body.items) // keep order items clean
    const order = { id: `order_${Date.now()}`, createdAt: new Date().toISOString(), customer: { name: String(customer.name ?? '').trim(), email, address: String(customer.address ?? '').trim() }, items, totals: buildDevOrderTotals(items) }
    devOrdersByUser[email] = [order, ...(devOrdersByUser[email] ?? [])]
    return sendJson(res, 201, order) // return created order
  }

  res.setHeader('Allow', 'GET, POST') // match API route behavior
  return sendJson(res, 405, { message: 'Method not allowed.' })
}

const normalizeDevOrderItems = (items: any[]): DevOrder['items'] => (
  Array.isArray(items) ? items.map((item) => ({ id: Number(item.id), title: String(item.title ?? ''), price: Number(item.price ?? 0), discountPercentage: Number(item.discountPercentage ?? 0), quantity: Number(item.quantity ?? 0) })) : []
)

const buildDevOrderTotals = (items: DevOrder['items']) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0) // item total
  const shipping = items.length ? 4.99 : 0 // same demo shipping rule
  return { subtotal, shipping, total: subtotal + shipping }
}
