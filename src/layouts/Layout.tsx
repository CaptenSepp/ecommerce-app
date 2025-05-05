import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navClass = (isActive: boolean) =>
  isActive
    ? 'px-3 py-2 text-white bg-blue-600 rounded'
    : 'px-3 py-2 text-blue-600 hover:bg-blue-100 rounded';

const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-gray-100 p-4">
      <nav className="space-x-4">
        <NavLink to="/" end className={({ isActive }) => navClass(isActive)}>Home</NavLink>
        <span>|</span>
        <NavLink to="/products" className={({ isActive }) => navClass(isActive)}>Products</NavLink>
        <span>|</span>
        <NavLink to="/cart" className={({ isActive }) => navClass(isActive)}>Cart</NavLink>
        <span>|</span>
        <NavLink to="/about" className={({ isActive }) => navClass(isActive)}>About</NavLink>
        <span>|</span>
        <NavLink to="/wishlist" className={({ isActive }) => navClass(isActive)}>Wishlist</NavLink>
      </nav>
    </header>
    <main className="flex-1"><Outlet /></main>
    <footer className="bg-gray-600 text-center p-4">© {new Date().getFullYear()} My E‑commerce</footer>
  </div>
);

export default Layout;