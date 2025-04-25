// src/pages/Products.tsx
import React from 'react'
import { Link } from 'react-router-dom'
const dummy = [{ id: '1', name: 'Product A' }, { id: '2', name: 'Product B' }]
const Products: React.FC = () => (
  <div>
    <h1 className="text-2xl mb-4">Products</h1>
    <ul className="space-y-2">
      {dummy.map(p => (
        <li key={p.id}>
          <Link to={`/products/${p.id}`} className="text-blue-600 hover:underline">
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
export default Products
