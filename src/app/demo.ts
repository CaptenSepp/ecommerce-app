import type { Product } from '@/features/products/services' // product type for demo data

type CartItem = Product & { quantity: number } // cart item shape for localStorage

const demoCartItems: CartItem[] = [ // demo cart items for fast checkout
  {
    id: 901,
    title: 'Demo Backpack',
    description: 'Lightweight daypack',
    price: 39.99,
    discountPercentage: 0,
    rating: 4.6,
    stock: 50,
    brand: 'Demo Co',
    category: 'bags',
    thumbnail: '',
    images: [],
    quantity: 1,
  },
  {
    id: 902,
    title: 'Demo Sneakers',
    description: 'Everyday trainers',
    price: 59.5,
    discountPercentage: 0,
    rating: 4.4,
    stock: 80,
    brand: 'Demo Co',
    category: 'shoes',
    thumbnail: '',
    images: [],
    quantity: 2,
  },
] // keep this small to load fast

const demoWishlistItems: Product[] = [ // demo wishlist items
  {
    id: 903,
    title: 'Demo Hoodie',
    description: 'Soft fleece hoodie',
    price: 49.0,
    discountPercentage: 0,
    rating: 4.2,
    stock: 40,
    brand: 'Demo Co',
    category: 'apparel',
    thumbnail: '',
    images: [],
  },
] // single item keeps the list short

const isDemoParamEnabled = () => { // check URL flag
  const params = new URLSearchParams(window.location.search) // read current query params
  return params.get('demo') === '1' // enable when demo=1
}

const readStoredState = <T>(key: string): T | undefined => { // safe localStorage read
  try {
    const raw = localStorage.getItem(key) // load raw JSON string
    if (!raw) return undefined // missing key => undefined
    return JSON.parse(raw) as T // parse stored data
  } catch {
    return undefined // invalid JSON or storage error
  }
}

const writeStoredState = (key: string, value: unknown) => { // safe localStorage write
  try {
    localStorage.setItem(key, JSON.stringify(value)) // store serialized state
  } catch {
    // ignore storage failures to avoid breaking app
  }
}

const isEmptyItemsState = (value: unknown): value is { items: unknown[] } => { // checks items list
  if (!value || typeof value !== 'object') return true // missing or wrong shape
  const items = (value as { items?: unknown[] }).items // read items list
  return !Array.isArray(items) || items.length === 0 // treat missing or empty as empty
}

export const initDemoIfNeeded = () => { // seed demo data if needed
  if (typeof window === 'undefined') return // skip during SSR or tests
  const forceDemo = isDemoParamEnabled() // demo flag from URL
  const existingCart = readStoredState<{ items: CartItem[] }>('cart') // read current cart
  const existingWishlist = readStoredState<{ items: Product[] }>('wishlist') // read current wishlist

  if (forceDemo || isEmptyItemsState(existingCart)) { // seed cart when forced or empty
    writeStoredState('cart', { items: demoCartItems }) // set demo cart
  }

  if (forceDemo || isEmptyItemsState(existingWishlist)) { // seed wishlist when forced or empty
    writeStoredState('wishlist', { items: demoWishlistItems }) // set demo wishlist
  }
}
