// src/pages/Products.tsx
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { toggleWishlist } from '../features/wishlist/wishlistSlice'
import { useProducts, useCategories } from '../features/products/hooks/productsHooks'
import { Product } from '../features/products/api'
import { Heart, ShoppingCart } from 'lucide-react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const dispatch = useDispatch()

  const { data: products, isLoading: loadingProducts } = useProducts()
  const { data: categories, isLoading: loadingCategories } = useCategories()

  if (loadingProducts || loadingCategories)
    return <p className="text-center mt-10">Loading...</p>

  // filter by category string
  const filtered = selectedCategory
    ? products!.filter(p => p.category === selectedCategory)
    : products!

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Category dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Category:</label>
        <select
          className="border rounded px-3 py-2 w-full sm:w-64"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories?.map(cat => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product: Product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm">{product.brand}</p>
            <p className="text-blue-600 font-bold mb-3">${product.price}</p>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="border px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1"
              >
                <Heart size={16} /> Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
