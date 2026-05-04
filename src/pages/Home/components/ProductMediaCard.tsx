import type { MouseEvent } from "react"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import type { Product } from "@/features/products/services"

type ProductMediaCardProps = {
  product: Product
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

const ProductMediaCard = ({ product, onClick }: ProductMediaCardProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="best-row__card card card--product"
      style={{ backgroundImage: `url(${product.thumbnail})` }} // Keep the image dynamic per product card.
      aria-label={`View ${product.title}`}
      draggable={false}
      onDragStart={(event) => event.preventDefault()} // Prevent browser drag image behavior on the card.
      onClick={onClick}
    >
      <span className="best-row__overlay" aria-hidden="true" />

      <div className="best-row__content">
        <div className="best-row__name line-clamp-2">{product.title}</div>
        <div className="best-row__rating">
          <Star size={14} className="best-row__star" aria-hidden="true" />
          <span className="best-row__rating-text">{product.rating.toFixed(1)}</span>
        </div>
        <div className="best-row__price u-font-bold">${product.price}</div>
      </div>
    </Link>
  )
}

export default ProductMediaCard
