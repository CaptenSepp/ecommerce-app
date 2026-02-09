import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/features/products/services";
import { useCategories, useProducts } from "@/features/products/hooks";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { useToast } from "@/components/ui/Toast";

const ProductsPage = () => { // product listing page with URL-synced filters
  const [searchParams, setSearchParams] = useSearchParams(); // URL query params are the source of truth
  const categoryQueryParam = searchParams.get("cat") || ""; // URL: category (slug)
  const initialQuery = searchParams.get("q") || ""; // URL: search text
  const initialSort = searchParams.get("sort") || "relevance"; // URL: sort option
  const saleMode = (() => { // interpret sale flag in a lenient way
    const v = (searchParams.get("sale") || "").toLowerCase();
    return v === "1" || v === "true";
  })();
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam); // local UI state mirrors URL
  const [searchQuery, setSearchQuery] = useState(initialQuery); // local UI state mirrors URL
  const [sortBy, setSortBy] = useState(initialSort); // local UI state mirrors URL
  const dispatch = useDispatch(); // dispatch for cart and wishlist actions
  const { notify } = useToast(); // toast helper for user feedback

  const { data: products = [], isLoading: isProductsLoading } = useProducts(); // fetch products for grid
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories(); // fetch categories for filters

  const FALLBACK_CATEGORIES = [ // fallback categories when API returns none
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
  ];
  const availableCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES; // prefer API categories

  useEffect(() => { // sync category from URL to local state
    setSelectedCategory(categoryQueryParam);
  }, [categoryQueryParam]);

  useEffect(() => { // sync query and sort from URL to local state
    setSearchQuery(initialQuery);
    setSortBy(initialSort);
  }, [initialQuery, initialSort]);

  const filteredProducts = useMemo(() => { // compute filtered/sorted products
    let list = selectedCategory // start with category filter
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    const q = searchQuery.trim().toLowerCase(); // apply free-text search
    if (q) {
      list = list.filter((p) =>
        (p.title ?? '').toLowerCase().includes(q) ||
        (p.brand ?? '').toLowerCase().includes(q)
      );
    }

    if (saleMode && list.length > 0) { // sale mode: narrow to cheapest ~20%
      const sortedByPrice = [...list].sort((a, b) => a.price - b.price);
      const take = Math.max(1, Math.ceil(sortedByPrice.length * 0.2));
      list = sortedByPrice.slice(0, take);
    }

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price); // lowest price first
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price); // highest price first
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating); // highest rating first
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title)); // alphabetical by title
        break;
      default:
        break; // relevance (preserve original order)
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy, saleMode]);

  if (isProductsLoading || isCategoriesLoading) {
    return <p>Loading...</p>; // simple loading state for both queries
  }

  return (
    <div className="px-4 py-8 flex gap-8">
      <aside className="w-64 shrink-0 space-y-4"> {/* sidebar filter controls (UI) */}
        <h2 className="font-semibold">Filter & Sort</h2>
        {/* search input (text query) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <input
            value={searchQuery}
            onChange={(e) => { // update search and URL params together
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
          {/* category radio list */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="cat"
              value=""
              checked={selectedCategory === ""}
              onChange={() => { // selecting "All" clears category filter
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

          {availableCategories.map((cat) => ( // category option from API or fallback list
            <label key={cat.slug} className="flex items-center gap-2">
              <input
                type="radio"
                name="cat"
              value={cat.slug}
              checked={selectedCategory === cat.slug}
                onChange={() => { // selecting a category updates URL params
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
            onChange={(e) => { // update sort and URL params
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

      <section className="flex-1 grid__cards"> {/* product grid (cards) */}
        {filteredProducts.length === 0 && ( // empty-state for filters with no matches
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
                  onClick={(e) => { // prevent navigation and update cart
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
                  onClick={(e) => { // prevent navigation and toggle wishlist
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
