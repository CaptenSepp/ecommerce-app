type ProductPriceProps = { // small price display props
  price: number
  discountPercentage?: number
  quantity?: number
  className?: string
}

const ProductPrice = ({ price, discountPercentage = 0, quantity = 1, className = "" }: ProductPriceProps) => {
  const currentPrice = price * quantity // show item or line price
  const currentText = quantity === 1 ? String(price) : currentPrice.toFixed(2) // keep normal item price style
  const oldPrice = currentPrice / (1 - discountPercentage / 100) // rebuild old price
  const oldText = oldPrice.toFixed(2) // round before comparing visible prices
  const hasDiscount = discountPercentage > 0 && discountPercentage < 100 && oldText !== currentPrice.toFixed(2)

  return (
    <span className={`product-price ${className}`.trim()}>
      {hasDiscount && (
        <span className="product-price__old">
          ${oldText}
        </span>
      )}
      <span className="product-price__current">${currentText}</span>
    </span>
  )
}

export default ProductPrice
