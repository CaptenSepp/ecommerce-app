import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/features/products/services";
import { useCategories, useProducts } from "@/features/products/hooks";
import ProductFilters from "@/features/products/components/ProductFilters";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { useToast } from "@/components/ui/toastContext";

const focusRingClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"; // visible keyboard focus

const ProductsPage = () => { // product listing page with URL-synced filters
  const [searchParams, setSearchParams] = useSearchParams(); // URL query params are the source of truth
  const categoryQueryParam = searchParams.get("cat") || ""; // URL: category (slug)
  const initialQuery = searchParams.get("q") || ""; // URL: search text
  const initialSort = searchParams.get("sort") || "relevance"; // URL: sort option
  const saleMode = (() => { // interpret sale flag in a lenient way
    const value = (searchParams.get("sale") || "").toLowerCase();
    return value === "1" || value === "true";
  })();
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam); // local UI state mirrors URL
  const [searchQuery, setSearchQuery] = useState(initialQuery); // local UI state mirrors URL
  const [sortBy, setSortBy] = useState(initialSort); // local UI state mirrors URL
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false); // mobile bottom sheet state
  const [draftCategory, setDraftCategory] = useState(categoryQueryParam); // mobile sheet draft category
  const [draftQuery, setDraftQuery] = useState(initialQuery); // mobile sheet draft search query
  const [draftSortBy, setDraftSortBy] = useState(initialSort); // mobile sheet draft sort
  const dispatch = useAppDispatch(); // typed dispatch for cart and wishlist actions
  const { notify } = useToast(); // toast helper for user feedback

  const { // products query incl. error + retry
    data: products = [],
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const { // categories query incl. error + retry
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

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

  useEffect(() => { // keep mobile draft aligned when live state changes
    setDraftCategory(categoryQueryParam);
  }, [categoryQueryParam]);

  useEffect(() => { // keep mobile draft query/sort aligned when live state changes
    setDraftQuery(initialQuery);
    setDraftSortBy(initialSort);
  }, [initialQuery, initialSort]);

  useEffect(() => { // lock page scroll while the mobile filters are open
    if (!isMobileFiltersOpen) return;
    const previousOverflow = document.body.style.overflow; // keep current value for restore
    document.body.style.overflow = "hidden"; // stop background scrolling
    return () => {
      document.body.style.overflow = previousOverflow; // restore after closing
    };
  }, [isMobileFiltersOpen]);

  const updateProductSearchParams = (nextValues: { category?: string; query?: string; sort?: string }) => { // keep URL updates in one place
    const nextCategory = nextValues.category ?? selectedCategory; // fall back to current category
    const nextQuery = nextValues.query ?? searchQuery; // fall back to current query
    const nextSort = nextValues.sort ?? sortBy; // fall back to current sort
    const nextParams: Record<string, string> = {}; // URL params map

    if (nextCategory) nextParams.cat = nextCategory; // write category only when selected
    if (nextQuery) nextParams.q = nextQuery; // write query only when present
    if (nextSort && nextSort !== "relevance") nextParams.sort = nextSort; // skip default sort value
    if (saleMode) nextParams.sale = "1"; // preserve sale flag

    setSearchParams(nextParams); // push next state to the URL
  };

  const openMobileFilters = () => { // open sheet with current live values
    setDraftCategory(selectedCategory); // copy current category into draft
    setDraftQuery(searchQuery); // copy current search into draft
    setDraftSortBy(sortBy); // copy current sort into draft
    setIsMobileFiltersOpen(true); // show the mobile sheet
  };

  const closeMobileFilters = () => { // close sheet without applying draft
    setIsMobileFiltersOpen(false); // hide the mobile sheet
  };

  const applyMobileFilters = () => { // commit draft values into the live page state
    setSelectedCategory(draftCategory); // apply drafted category
    setSearchQuery(draftQuery); // apply drafted query
    setSortBy(draftSortBy); // apply drafted sort
    updateProductSearchParams({
      category: draftCategory,
      query: draftQuery,
      sort: draftSortBy,
    }); // sync all draft values to the URL
    setIsMobileFiltersOpen(false); // close after applying
  };

  const filteredProducts = useMemo(() => { // compute filtered/sorted products
    let list = selectedCategory // start with category filter
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    const normalizedQuery = searchQuery.trim().toLowerCase(); // normalize search text once
    if (normalizedQuery) {
      list = list.filter((product) =>
        (product.title ?? "").toLowerCase().includes(normalizedQuery) ||
        (product.brand ?? "").toLowerCase().includes(normalizedQuery)
      );
    }

    if (saleMode && list.length > 0) { // sale mode: narrow to cheapest ~20%
      const sortedByPrice = [...list].sort((a, b) => a.price - b.price);
      const take = Math.max(1, Math.ceil(sortedByPrice.length * 0.2));
      list = sortedByPrice.slice(0, take);
    }

    const sorted = [...list];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price); // lowest price first
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price); // highest price first
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating); // highest rating first
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title)); // alphabetical by title
        break;
      default:
        break; // relevance (preserve original order)
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy, saleMode]);

  const hasUsableProducts = products.length > 0; // keep UI alive when stale data exists
  const hasUsableCategories = categories.length > 0 || FALLBACK_CATEGORIES.length > 0; // categories always have fallback
  const hasBlockingLoadFailure = (productsError || categoriesError) && !hasUsableProducts && !hasUsableCategories; // only block when nothing renderable exists

  if (isProductsLoading || isCategoriesLoading) {
    return <p role="status" aria-live="polite">Loading...</p>; // announce loading state
  }

  if (hasBlockingLoadFailure) {
    return (
      <div className="px-4 py-8 space-y-3">
        <p className="u-text-danger">
          Error: {productsError?.message || categoriesError?.message || "Failed to load data"} {/* show the relevant API error in one place */}
        </p>
        <button
          className={`btn btn-primary btn-sm ${focusRingClass}`}
          onClick={() => { // retry only failed queries (or both as fallback)
            const retries: Promise<unknown>[] = [];
            if (productsError) retries.push(refetchProducts());
            if (categoriesError) retries.push(refetchCategories());
            if (retries.length === 0) retries.push(refetchProducts(), refetchCategories());
            void Promise.all(retries);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-4 flex items-center justify-between gap-3 md:hidden"> {/* mobile trigger row */}
        <button
          type="button"
          className={`btn btn-secondary btn-sm ${focusRingClass}`}
          onClick={openMobileFilters} // open mobile bottom sheet
        >
          Filter & Sort
        </button>
        <div className="u-text-sm text-muted">{filteredProducts.length} results</div> {/* quick mobile summary */}
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 md:block" aria-label="Product filters"> {/* desktop sidebar */}
          <ProductFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            availableCategories={availableCategories}
            focusRingClass={focusRingClass}
            title="Filter & Sort"
            onSearchChange={(nextQuery) => { // update search and URL params together
              setSearchQuery(nextQuery)
              updateProductSearchParams({ query: nextQuery })
            }}
            onCategoryChange={(nextCategory) => { // update category and URL params together
              setSelectedCategory(nextCategory)
              updateProductSearchParams({ category: nextCategory })
            }}
            onSortChange={(nextSort) => { // update sort and URL params together
              setSortBy(nextSort)
              updateProductSearchParams({ sort: nextSort })
            }}
          />
        </aside>

        <section className="flex-1 grid__cards" aria-label="Product results"> {/* product grid (cards) */}
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
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" /> {/* overlay for text readability */}

              <div className="relative flex h-full flex-col"> {/* allow bottom-aligned actions */}
                <h3 className="u-font-semibold">{product.title}</h3>
                {product.brand.trim().length > 0 && product.brand !== "Unknown brand" && ( // hide missing brand on cards
                  <p className="u-text-sm mb-2">{product.brand}</p>
                )}
                <p className="text-brand-orange u-font-bold">${product.price}</p>

                <div className="products-card__actions mt-auto"> {/* keep actions at bottom */}
                  <button
                    onClick={(event) => { // prevent navigation and update cart
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch(addToCart(product));
                      notify("Added to cart", "success");
                    }}
                    type="button"
                    className={`btn btn-primary btn-sm btn-square products-card__action-btn ${focusRingClass}`}
                  >
                    <ShoppingCart size={14} /> Add
                  </button>

                  <button
                    onClick={(event) => { // prevent navigation and toggle wishlist
                      event.preventDefault();
                      event.stopPropagation();
                      dispatch(toggleWishlist(product));
                      notify("Wishlist updated", "info");
                    }}
                    type="button"
                    className={`btn btn-secondary btn-sm btn-square products-card__action-btn ${focusRingClass}`}
                  >
                    <Heart size={14} /> Wish
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {isMobileFiltersOpen && ( // mobile-only bottom sheet
        <div className="products-filters-sheet md:hidden">
          <button
            type="button"
            className="products-filters-sheet__backdrop"
            aria-label="Close filters"
            onClick={closeMobileFilters} // close without applying
          />
          <div className="products-filters-sheet__panel">
            <div className="products-filters-sheet__header">
              <h2 className="u-text-lg u-font-semibold mb-0">Filter & Sort</h2>
              <div className="products-filters-sheet__header-actions">
                <button
                  type="button"
                  className={`btn btn-secondary btn-sm ${focusRingClass}`}
                  onClick={closeMobileFilters} // discard draft changes
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn btn-primary btn-sm ${focusRingClass}`}
                  onClick={applyMobileFilters} // apply draft changes
                >
                  Done
                </button>
              </div>
            </div>
            <ProductFilters
              searchQuery={draftQuery}
              selectedCategory={draftCategory}
              sortBy={draftSortBy}
              availableCategories={availableCategories}
              focusRingClass={focusRingClass}
              title="Filters"
              onSearchChange={(nextQuery) => { // update draft search only inside the sheet
                setDraftQuery(nextQuery)
              }}
              onCategoryChange={(nextCategory) => { // update draft category only inside the sheet
                setDraftCategory(nextCategory)
              }}
              onSortChange={(nextSort) => { // update draft sort only inside the sheet
                setDraftSortBy(nextSort)
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
