// src/pages/Products.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';

const Products: React.FC = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products…</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh_-_80px)] justify-center"> 
      <h1 className="text-2xl mb-4 ">Products</h1> 
      <section className="w-full max-w-md overflow-y-auto scroll-smooth">         
        <ul className="space-y-2">
          {data!.map(p => (
            <li key={p.id}>
              <Link to={`/products/${p.id}`} className="text-blue-600 hover:underline">
                {p.title} - {p.brand} – ${p.price}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Products;