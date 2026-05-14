import { Heart, ShoppingCart } from "lucide-react"
import type { MouseEvent } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "@/app/store"
import { useToast } from "@/components/ui/toastContext"
import { addToCart } from "@/features/cart/cartSlice"
import type { Product } from "@/features/products/services"
import ProductPrice from "@/features/products/components/ProductPrice"
import { toggleWishlist } from "@/features/wishlist/wishlistSlice"
import { focusRingClass } from "@/features/products/products-page-tools"

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch() // dispatch product actions
  const { notify } = useToast() // show quick feedback
  const isOutOfStock = product.stock <= 0 // disable buying when no stock is left
  const [stockTooltip, setStockTooltip] = useState<{ x: number; y: number } | null>(null)

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // Keep the parent link from opening on button clicks.
    event.stopPropagation()
    if (isOutOfStock) return // Keep sold-out items from reaching the cart.
    dispatch(addToCart(product))
    notify("Added to cart", "success")
  }

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault() // Use the same event handling for the second quick action.
    event.stopPropagation()
    dispatch(toggleWishlist(product))
    notify("Wishlist updated", "info")
  }

  const handleStockTooltipMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isOutOfStock) return // Only show this helper for blocked cart actions.
    setStockTooltip({ x: event.clientX + 12, y: event.clientY + 12 })
  }

  return (
    <div className="flex flex-col">
      <Link to={`/products/${product.id}`} className="card card--product bg-cover bg-center relative block" style={{ backgroundImage: `url(${product.thumbnail})` }} aria-label={`View ${product.title}`}>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-end">
          <div className="products-card__actions">
            <button type="button" aria-label={`Add ${product.title} to cart`} aria-disabled={isOutOfStock} className={`btn btn-primary btn-sm btn-square products-card__action-btn ${isOutOfStock ? "products-card__action-btn--disabled" : ""} ${focusRingClass}`} onClick={handleAddToCart} onMouseMove={handleStockTooltipMove} onMouseLeave={() => setStockTooltip(null)}>
              <ShoppingCart size={14} />
              <span className="products-card__action-text">Add</span>
            </button>
            <button type="button" aria-label={`Add ${product.title} to wishlist`} className={`btn btn-secondary btn-sm btn-square products-card__action-btn ${focusRingClass}`} onClick={handleToggleWishlist}>
              <Heart size={14} />
              <span className="products-card__action-text">Wish</span>
            </button>
          </div>
        </div>
      </Link>
      {stockTooltip && (
        <span className="products-card__stock-tooltip" style={{ left: stockTooltip.x, top: stockTooltip.y }}>
          This product is out of stock and can't go to the cart.
        </span>
      )}

      <div className="mt-3 px-2 flex flex-col">
        <h3 className="u-font-semibold">{product.title}</h3>
        {product.brand.trim().length > 0 && product.brand !== "Unknown brand" && <p className="mb-2 u-text-sm">{product.brand}</p>}
        <ProductPrice price={product.price} discountPercentage={product.discountPercentage} className="text-brand-orange u-font-bold" />
      </div>
    </div>
  )
}

export default ProductCard
