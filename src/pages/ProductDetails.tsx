import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/app/store'
import { useProductById } from '@/features/products/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toggleWishlist } from '@/features/wishlist/wishlistSlice'
import { useToast } from '@/components/ui/toastContext'
import ProductPrice from '@/features/products/components/ProductPrice'
import type { Product } from '@/features/products/services'

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>() // read id from URL
  const productIdNumber = Number(productId) // coerce to number for API hook

  if (!Number.isFinite(productIdNumber)) return <div>Not found</div> // invalid route id

  return <ProductDetailsContent productIdNumber={productIdNumber} />
}

const ProductDetailsContent = ({ productIdNumber }: { productIdNumber: number }) => {
  const dispatch = useAppDispatch() // typed dispatch for cart/wishlist actions
  const { notify } = useToast() // toast helper
  const { data: product, isLoading, error, refetch } = useProductById(productIdNumber) // fetch product by id incl. retry

  const handleRetry = () => {
    void refetch() // Retry the same product request when the user asks again.
  }

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return // Guard loaded data and sold-out items.
    dispatch(addToCart(product))
    notify('Added to cart', 'success')
  }

  const handleToggleWishlist = () => {
    if (!product) return // Keep the same safety check for the wishlist action too.
    dispatch(toggleWishlist(product))
    notify('Wishlist updated', 'info')
  }

  if (isLoading) return <div>Loading...</div> // loading state
  if (error) {
    return (
      <div className="px-4 py-6 space-y-3">
        <div>Error: {error.message}</div> {/* API error state */}
        <button className="btn btn-primary btn-sm" onClick={handleRetry}> {/* retry same request */}
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
        <ProductDetailsSummary
          product={product}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>
    </div>
  )
}

type ProductDetailsSummaryProps = {
  product: Product
  onAddToCart: () => void
  onToggleWishlist: () => void
}

const ProductDetailsSummary = ({
  product,
  onAddToCart,
  onToggleWishlist,
}: ProductDetailsSummaryProps) => {
  const isOutOfStock = product.stock <= 0 // Match product card sold-out logic.

  return (
    <div>
      <h1 className="u-text-2xl u-font-semibold mb-2">{product.title}</h1>
      <p className="text-[color:var(--text-muted)] mb-4">
        {product.brand} • Rating: {product.rating}
      </p>
      <p className="mb-4">{product.description}</p>
      <ProductPrice price={product.price} discountPercentage={product.discountPercentage} className="text-brand-orange u-font-bold u-text-xl mb-4" />
      <p className="stock-note mb-4">{product.stock} available in stock</p>

      <div className="flex gap-3">
        <button className="btn btn-primary" onClick={onAddToCart} disabled={isOutOfStock}>
          {isOutOfStock ? 'Out of stock' : 'Add to Cart'}
        </button>
        <button className="btn btn-secondary" onClick={onToggleWishlist}>
          Wishlist
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
