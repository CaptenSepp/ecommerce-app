import { Heart, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { useToast } from "@/components/ui/toastContext"
import { addToCart } from "@/features/cart/cartSlice"
import type { Product } from "@/features/products/services"
import { toggleWishlist } from "@/features/wishlist/wishlistSlice"
import { focusRingClass } from "@/features/products/products-page-tools"

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch() // dispatch product actions
  const { notify } = useToast() // show quick feedback

  return (
    <div className="flex flex-col">
      <Link to={`/products/${product.id}`} className="card card--product bg-cover bg-center relative block" style={{ backgroundImage: `url(${product.thumbnail})` }} aria-label={`View ${product.title}`}>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-end">
          <div className="products-card__actions">
            <button type="button" aria-label={`Add ${product.title} to cart`} className={`btn btn-primary btn-sm btn-square products-card__action-btn ${focusRingClass}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); dispatch(addToCart(product)); notify("Added to cart", "success") }}>
              <ShoppingCart size={14} />
              <span className="products-card__action-text">Add</span>
            </button>
            <button type="button" aria-label={`Add ${product.title} to wishlist`} className={`btn btn-secondary btn-sm btn-square products-card__action-btn ${focusRingClass}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); dispatch(toggleWishlist(product)); notify("Wishlist updated", "info") }}>
              <Heart size={14} />
              <span className="products-card__action-text">Wish</span>
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-3 px-2 flex flex-col">
        <h3 className="u-font-semibold">{product.title}</h3>
        {product.brand.trim().length > 0 && product.brand !== "Unknown brand" && <p className="mb-2 u-text-sm">{product.brand}</p>}
        <p className="text-brand-orange u-font-bold">${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
