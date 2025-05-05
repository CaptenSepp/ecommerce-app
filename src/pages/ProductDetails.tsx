// src/pages/ProductDetails.tsx
import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../features/products/hooks/productsHooks'

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>()
  const id = Number(productId)
  const { data: product, isLoading, error } = useProduct(id)

  if (isLoading) return <div>Loading…</div>
  if (error) return <div>Error: {error.message}</div>
  if (!product) return <div>Not found</div>

  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail: {id}</h1>
      <Link to="/products" className="text-blue-600 hover:underline">
        ← Back to products
      </Link>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
  )
}

export default ProductDetails
