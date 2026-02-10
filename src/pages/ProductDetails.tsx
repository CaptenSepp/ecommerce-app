import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/app/store'
import { useProductById } from '@/features/products/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toggleWishlist } from '@/features/wishlist/wishlistSlice'
import { useToast } from '@/components/ui/toastContext'

const ProductDetails = () => {
  const dispatch = useAppDispatch() // typed dispatch for cart/wishlist actions
  const { notify } = useToast() // toast helper
  const { productId } = useParams<{ productId: string }>() // read id from URL
  const productIdNumber = Number(productId) // coerce to number for API hook
  const { data: product, isLoading, error, refetch } = useProductById(productIdNumber) // fetch product by id incl. retry

  if (isLoading) return <div>Loading...</div> // loading state
  if (error) {
    return (
      <div className="px-4 py-6 space-y-3">
        <div>Error: {error.message}</div> {/* API error state */}
        <button className="btn btn-primary btn-sm" onClick={() => { void refetch() }}> {/* retry same request */}
          Retry
        </button>
      </div>
    )
  }
  if (!product) return <div>Not found</div> // missing data state

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
            <button
              className="btn btn-primary"
              onClick={() => { dispatch(addToCart(product)); notify('Added to cart', 'success'); }} // add to cart + toast
            >
              Add to Cart
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { dispatch(toggleWishlist(product)); notify('Wishlist updated', 'info'); }} // toggle wishlist + toast
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

