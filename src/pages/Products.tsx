// Products.tsx
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import { Product } from '../features/products/api'
import { useCategories, useProducts } from '../features/products/hooks/productsHooks'
import { toggleWishlist } from '../features/wishlist/wishlistSlice'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const dispatch = useDispatch()

  const EXTRA_CATEGORIES = [
    { slug: 'beauty', name: 'Beauty' },
    { slug: 'fragrances', name: 'Fragrances' },
    { slug: 'furniture', name: 'Furniture' },
    { slug: 'groceries', name: 'Groceries' },
  ]

  const { data: products = [], isLoading: lp } = useProducts()
  const { data: categories = [], isLoading: lc } = useCategories()
  if (lp || lc) return <p>Loading…</p>

  const mergedCats = [
    ...categories,
    ...EXTRA_CATEGORIES.filter(
      ex => !categories.some(c => c.slug === ex.slug)
    ),
  ]

  const filtered = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  return (
    <div className="px-4 py-8 flex gap-8">
      {/* ───── Sidebar Filter ───── */}
      <aside className="w-50 shrink-0 space-y-4">
        <h2 className="font-semibold">Filter and Sort</h2>
        <form className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              value=""
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
            />
            All
          </label>
          {mergedCats.map(cat => (
            <label key={cat.slug} className="flex items-center gap-2">
              <input
                type="radio"
                name="cat"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
              />
              {cat.name}
            </label>
          ))}

        </form>
      </aside>

      {/* ───── Produkt-Grid */}
      <section className="flex-1 grid__cards ">
        {filtered.map((product: Product) => (
          <div
            key={product.id}
            className="card card--product bg-cover bg-center backgroundcolor-brand-gray"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
          >
            <Link to={`/products/${product.id}`} className="absolute inset-0" />

            <span className="overlay" />

            <div className="card--product__content">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm mb-2">{product.brand}</p>
              <p className="text-brand-orange font-bold mb-3">${product.price}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="btn btn-primary btn-sm"
                >
                  <ShoppingCart size={14} /> Add
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className="btn btn-secondary btn-sm"
                >
                  <Heart size={14} /> Wish
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  )
}

export default Products
