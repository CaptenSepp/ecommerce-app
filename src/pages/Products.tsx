// src/pages/Products.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../features/products/useProducts'

const Products: React.FC = () => {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) return <p>Loading products…</p>
  if (isError) return <p>Failed to load products.</p>

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-1000">
      <h1 className="text-2xl " >Products</h1>
      <ul className="space-y-2">
        {data!.map(p => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`} className="text-red hover:underline">
              {p.name} – ${p.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products
