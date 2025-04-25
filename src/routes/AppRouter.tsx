// src/routes/AppRouter.tsx
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import NotFound from '../pages/NotFound'

const Home = lazy(() => import('../pages/Home'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const About = lazy(() => import('../pages/About'))

const AppRouter: React.FC = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
)

export default AppRouter
