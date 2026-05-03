import type { Product } from "@/features/products/services"
import ProductCard from "./ProductCard"

const ProductsGrid = ({ products }: { products: Product[] }) => (
  <section className="flex-1 grid__cards" aria-label="Product results">
    {products.length === 0 && <div className="text-muted">No products match your filters.</div>}
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </section>
)

export default ProductsGrid
