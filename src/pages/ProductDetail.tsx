import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>
      <h1 className="text-2xl mb-4">Product Detail: {id}</h1>
      <Link to="/products" className="text-blue-600 hover:underline">
        ← Back to products
      </Link>
    </div>
  )
}

export default ProductDetail
