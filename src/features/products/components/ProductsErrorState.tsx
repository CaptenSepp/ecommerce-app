import { focusRingClass } from "@/features/products/products-page-tools"

type ProductsErrorStateProps = {
  errorMessage: string
  onRetry: () => void
}

const ProductsErrorState = ({ errorMessage, onRetry }: ProductsErrorStateProps) => (
  <div className="space-y-3 px-4 py-8">
    <p className="u-text-danger">Error: {errorMessage}</p>
    <button className={`btn btn-primary btn-sm ${focusRingClass}`} onClick={onRetry}>
      Retry
    </button>
  </div>
)

export default ProductsErrorState
