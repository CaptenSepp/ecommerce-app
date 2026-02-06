import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/features/products/services";
import { useCategories, useProducts } from "@/features/products/hooks";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { useToast } from "@/components/ui/Toast";

// product listing page with filters and sorting (view) syncing with URL (query params)
const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // read initial values from URL: category (slug), search text, sort option, sale flag (query params)
  const categoryQueryParam = searchParams.get("cat") || "";
  const initialQuery = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "relevance";
  const saleMode = (() => {
    const v = (searchParams.get("sale") || "").toLowerCase();
    return v === "1" || v === "true";
  })();
  // local UI state mirrors URL parameters (controlled state)
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);
  const dispatch = useDispatch();
  const { notify } = useToast();

  // fetch products and categories (data hooks -> endpoint/payload)
  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  if (isProductsLoading || isCategoriesLoading) return <p>Loading...</p>;

  // fallback categories when the API returns none (resiliency)
  const FALLBACK_CATEGORIES = [
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
  ];
  const availableCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;

  // keep selected category in sync with URL (single source of truth)
  useEffect(() => {
    setSelectedCategory(categoryQueryParam);
  }, [categoryQueryParam]);

  // keep search text and sort in sync with URL (query params)
  useEffect(() => {
    setSearchQuery(initialQuery);
    setSortBy(initialSort);
  }, [initialQuery, initialSort]);

  // compute filtered and sorted products (memoized) from current filters (category/search/sale/sort)
  const filteredProducts = useMemo(() => {
    let list = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        (p.title ?? '').toLowerCase().includes(q) ||
        (p.brand ?? '').toLowerCase().includes(q)
      );
    }

    // if 'sale' is active, narrow to the cheapest ~20% of current list (sale mode)
    if (saleMode && list.length > 0) {
      const sortedByPrice = [...list].sort((a, b) => a.price - b.price);
      const take = Math.max(1, Math.ceil(sortedByPrice.length * 0.2));
      list = sortedByPrice.slice(0, take);
    }

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // relevance (preserve original order)
        break;
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy, saleMode]);

  return (
    <div className="px-4 py-8 flex gap-8">
      {/* sidebar filter controls (UI) */}
      <aside className="w-64 shrink-0 space-y-4">
        <h2 className="font-semibold">Filter & Sort</h2>
        {/* search input (text query) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <input
            value={searchQuery}
            onChange={(e) => {
              const q = e.target.value;
              setSearchQuery(q);
              const next: Record<string, string> = {};
              if (selectedCategory) next.cat = selectedCategory;
              if (q) next.q = q;
              if (sortBy && sortBy !== 'relevance') next.sort = sortBy;
              if (saleMode) next.sale = '1';
              setSearchParams(next); // reflect changes in the URL (query params)
            }}
            placeholder="Search products..."
            className="input-field"
            aria-label="Search products"
          />
        </div>
        <form className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              value=""
              checked={selectedCategory === ""}
              onChange={() => {
                  setSelectedCategory("");
                  const next: Record<string, string> = {};
                  if (searchQuery) next.q = searchQuery;
                  if (sortBy && sortBy !== 'relevance') next.sort = sortBy;
                  if (saleMode) next.sale = '1';
                  setSearchParams(next); // update URL when selecting All (query)
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
                  const next: Record<string, string> = {};
                  if (cat.slug) next.cat = cat.slug;
                  if (searchQuery) next.q = searchQuery;
                  if (sortBy && sortBy !== 'relevance') next.sort = sortBy;
                  if (saleMode) next.sale = '1';
                  setSearchParams(next); // put selected category (slug) into the URL (query)
              }}
              />
            {cat.name}
          </label>
          ))}
        </form>
        {/* sort dropdown (ordering) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort by</label>
          <select
            className="input-field"
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value;
              setSortBy(val);
              const next: Record<string, string> = {};
              if (selectedCategory) next.cat = selectedCategory;
              if (searchQuery) next.q = searchQuery;
              if (val && val !== 'relevance') next.sort = val;
              if (saleMode) next.sale = '1';
              setSearchParams(next); // persist sort choice into the URL (query)
            }}
            aria-label="Sort products"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
            <option value="title-asc">Title A–Z</option>
          </select>
        </div>
      </aside>

      {/* product grid (cards) */}
      <section className="flex-1 grid__cards">
        {filteredProducts.length === 0 && (
          <div className="text-muted">No products match your filters.</div>
        )}
        {filteredProducts.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card card--product bg-cover bg-center relative block"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            {/* overlay for text readability (UI overlay) */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="relative flex flex-col justify-end">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm mb-2">{product.brand}</p>
              <p className="text-brand-orange font-bold mb-4">${product.price}</p>

              {/* action buttons without leaving the grid (prevent navigation) */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addToCart(product));
                    notify('Added to cart', 'success');
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
                    notify('Wishlist updated', 'info');
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
