// src/pages/ProductDetails.tsx
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useProductById } from '@/features/products/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toggleWishlist } from '@/features/wishlist/wishlistSlice'
import { useToast } from '@/components/ui/Toast'

const ProductDetails = () => {
  // prepare helpers and read id from URL (dispatch, toast, route param / identifier)
  const dispatch = useDispatch()
  const { notify } = useToast()
  const { productId } = useParams<{ productId: string }>()
  const productIdNumber = Number(productId)
  // fetch the product by its numeric id (data hook -> endpoint/payload)
  const { data: product, isLoading, error } = useProductById(productIdNumber)

  // handle loading, error and missing data states (guards)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!product) return <div>Not found</div>

  return (
    <div className="px-4 py-6">
      <div className="mb-3">
        <Link to="/products" className="text-brand-orange hover:underline">
          Back to products
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <img className="w-full h-auto rounded-lg" src={product.thumbnail} alt={product.title} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-[color:var(--text-muted)] mb-4">{product.brand} • Rating: {product.rating}</p>
          <p className="mb-4">{product.description}</p>
          <p className="text-brand-orange font-bold text-xl mb-4">${product.price}</p>
          <div className="flex gap-3">
            {/* add to cart then show a success toast (dispatch + feedback) */}
            <button
              className="btn btn-primary"
              onClick={() => { dispatch(addToCart(product)); notify('Added to cart', 'success'); }}
            >
              Add to Cart
            </button>
            {/* toggle wishlist and inform the user (dispatch + toast) */}
            <button
              className="btn btn-secondary"
              onClick={() => { dispatch(toggleWishlist(product)); notify('Wishlist updated', 'info'); }}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
