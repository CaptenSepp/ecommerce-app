import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // rating icon
import { useProducts } from "@/features/products/hooks";
import { Product } from "@/features/products/services";
type ScrollbarProps = {
  offset?: number;
  title?: string;
};
type ProductScrollProps = {
  limit?: number;
  offset?: number;
};

type ProductScrollHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ offset = 0, title }) => {
  const rowRef = React.useRef<ProductScrollHandle | null>(null); // holds methods to scroll left/right
  return (
    <div className="flex-column__grid">
      <div className="mb-3 flex items-center justify-between"> {/* title + buttons row */}
        <div className="best-row__title">{title}</div> {/* left title */}
        <div className="flex gap-2"> {/* scroll buttons */}
          <button type="button" className="scroll-btn" aria-label="Scroll left" onClick={() => rowRef.current?.scrollLeft()}>
            <span className="scroll-btn__icon scroll-btn__icon--left" aria-hidden="true" />
          </button>
          <button type="button" className="scroll-btn" aria-label="Scroll right" onClick={() => rowRef.current?.scrollRight()}>
            <span className="scroll-btn__icon scroll-btn__icon--right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ProductScroll ref={rowRef} offset={offset} /> {/* scrolling row starting at offset */}
    </div>
  );
};

export default Scrollbar;

const ProductScroll = React.forwardRef<ProductScrollHandle, ProductScrollProps>( // inner component with imperative handle
  ({ limit = 8, offset = 0 }, ref) => {
    const { data: products = [], isLoading, error, refetch } = useProducts(); // fetch products incl. loading/error/retry
    const visibleProducts = products.slice(offset, offset + limit); // choose window of products

    const listRef = React.useRef<HTMLDivElement | null>(null); // reference to scrollable container

    const scrollByAmount = (dx: number) => {
      const el = listRef.current;
      if (!el) return;
      el.scrollBy({ left: dx, behavior: "smooth" }); // smooth horizontal scroll
    };

    React.useImperativeHandle(ref, () => ({
      scrollLeft: () => scrollByAmount(-320), // step left
      scrollRight: () => scrollByAmount(320), // step right
    }));

    if (isLoading) return <div>Loading...</div>; // loading state for scroller data
    if (error) {
      return (
        <div className="space-y-2">
          <p className="u-text-danger">Error: {error.message}</p> {/* API error state */}
          <button className="btn btn-primary btn-sm" onClick={() => { void refetch(); }}> {/* retry scroller request */}
            Retry
          </button>
        </div>
      );
    }

    return (
      <div ref={listRef} className="scroll-row__card flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"> {/* scrollable row */}
        {visibleProducts.map((product: Product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="best-row__card card card--product" // match best sellers look
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            <span className="best-row__overlay" aria-hidden="true" />
            <div className="best-row__content">
              <div className="best-row__name line-clamp-2">{product.title}</div>
              <div className="best-row__rating">
                <Star size={14} className="best-row__star" aria-hidden="true" />
                <span className="best-row__rating-text">{product.rating.toFixed(1)}</span>
              </div>
              <div className="best-row__price u-font-bold">${product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
);
