import type { Product } from '@/features/products/services' // product type for demo data

type CartItem = Product & { quantity: number } // cart item shape for localStorage

const demoCartItems: CartItem[] = [ // demo cart items for fast checkout
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    price: 9.99,
    discountPercentage: 10.48,
    rating: 2.56,
    stock: 99,
    brand: 'Essence',
    category: 'beauty',
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'],
    quantity: 1,
  },
  {
    id: 11,
    title: 'Annibale Colombo Bed',
    description: 'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
    price: 1899.99,
    discountPercentage: 8.57,
    rating: 4.77,
    stock: 88,
    brand: 'Annibale Colombo',
    category: 'furniture',
    thumbnail: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp',
    ],
    quantity: 2,
  },
] // keep this small to load fast

const demoWishlistItems: Product[] = [ // demo wishlist items
  {
    id: 12,
    title: 'Annibale Colombo Sofa',
    description: 'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.',
    price: 2499.99,
    discountPercentage: 14.4,
    rating: 3.92,
    stock: 60,
    brand: 'Annibale Colombo',
    category: 'furniture',
    thumbnail: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp',
    ],
  },
] // single item keeps the list short

const legacyDemoIds = new Set([901, 902, 903]) // old fake seeded product ids

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

const isMissingItemsState = (value: unknown): value is { items: unknown[] } => { // checks missing items list only
  if (!value || typeof value !== 'object') return true // missing or wrong shape
  const items = (value as { items?: unknown[] }).items // read items list
  return !Array.isArray(items) // only seed when state is missing
}

const hasLegacyDemoItems = (value: unknown): value is { items: Array<{ id: number }> } => { // detect old fake seed entries
  if (!value || typeof value !== 'object') return false // ignore missing or invalid state
  const items = (value as { items?: Array<{ id?: number }> }).items // read maybe-items safely
  if (!Array.isArray(items)) return false // only arrays can contain product items
  return items.some((item) => legacyDemoIds.has(item.id ?? -1)) // replace only old fake products
}

export const initDemoIfNeeded = () => { // seed demo data if needed
  if (typeof window === 'undefined') return // skip during SSR or tests
  const forceDemo = isDemoParamEnabled() // demo flag from URL
  const existingCart = readStoredState<{ items: CartItem[] }>('cart') // read current cart
  const existingWishlist = readStoredState<{ items: Product[] }>('wishlist') // read current wishlist

  if (forceDemo || isMissingItemsState(existingCart) || hasLegacyDemoItems(existingCart)) { // seed cart when forced, missing, or legacy fake
    writeStoredState('cart', { items: demoCartItems }) // set demo cart
  }

  if (forceDemo || isMissingItemsState(existingWishlist) || hasLegacyDemoItems(existingWishlist)) { // seed wishlist when forced, missing, or legacy fake
    writeStoredState('wishlist', { items: demoWishlistItems }) // set demo wishlist
  }
}
