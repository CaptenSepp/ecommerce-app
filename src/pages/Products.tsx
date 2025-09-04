import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { Product } from "../features/products/api";
import {
  useCategories,
  useProducts,
} from "../features/products/hooks/productsHooks";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";



const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat") || "";
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const dispatch = useDispatch();

  /* ---- Daten abrufen ---- */
  const { data: products = [], isLoading: lp } = useProducts();
  const { data: categories = [], isLoading: lc } = useCategories();
  if (lp || lc) return <p>Loading…</p>;

  /* ---- Kategorien mergen ---- */
  const FALLBACK_CATEGORIES = [
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
  ];
  const mergedCats = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;

  // keep local state in sync with query param
  useEffect(() => {
    setSelectedCategory(catParam);
  }, [catParam]);

  /* ---- Produkte filtern ---- */
  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="px-4 py-8 flex gap-8">
      {/* ───── Sidebar Filter ───── */}
      <aside className="w-52 shrink-0 space-y-4">
        <h2 className="font-semibold">Filter & Sort</h2>
        <form className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              value=""
              checked={selectedCategory === ""}
              onChange={() => {
                setSelectedCategory("");
                setSearchParams({});
              }}
            />
            All
          </label>

          {mergedCats.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2"
            >
              <input
                type="radio"
                name="cat"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={() => {
                  setSelectedCategory(cat.slug);
                  setSearchParams(cat.slug ? { cat: cat.slug } : {});
                }}
              />
              {cat.name}
            </label>
          ))}
        </form>
      </aside>

      {/* ───── Produkt-Grid ───── */}
      <section className="flex-1 grid__cards">
        {filtered.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card card--product bg-cover bg-center relative block"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            {/* Leichter Overlay für bessere Lesbarkeit */}
            <span className="inset-0 absolute" />

            <div className="relative flex flex-col justify-end">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm mb-2">{product.brand}</p>
              <p className="text-brand-orange font-bold mb-4">
                ${product.price}
              </p>

              {/* ----- Buttons: Navigation blockieren ----- */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addToCart(product));
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <ShoppingCart size={14} /> Add
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(toggleWishlist(product));
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Heart size={14} /> Wish
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;

