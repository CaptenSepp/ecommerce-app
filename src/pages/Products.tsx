import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { Product } from "../features/products/api";
import { useCategories, useProducts } from "../features/products/hooks/productsHooks";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQueryParam = searchParams.get("cat") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam);
  const dispatch = useDispatch();

  // Fetch products and categories
  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  if (isProductsLoading || isCategoriesLoading) return <p>Loading…</p>;

  // Fallback categories if API returns none
  const FALLBACK_CATEGORIES = [
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
  ];
  const availableCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;

  // Keep local state in sync with query param
  useEffect(() => {
    setSelectedCategory(categoryQueryParam);
  }, [categoryQueryParam]);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="px-4 py-8 flex gap-8">
      {/* Sidebar Filter */}
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

          {availableCategories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2">
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

      {/* Product Grid */}
      <section className="flex-1 grid__cards">
        {filteredProducts.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card card--product bg-cover bg-center relative block"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            {/* Overlay for readability */}
            <span className="inset-0 absolute" />

            <div className="relative flex flex-col justify-end">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm mb-2">{product.brand}</p>
              <p className="text-brand-orange font-bold mb-4">${product.price}</p>

              {/* Buttons: prevent navigation */}
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

export default ProductsPage;

