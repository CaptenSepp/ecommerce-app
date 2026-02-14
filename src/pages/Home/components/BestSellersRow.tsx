import React from "react"; // react types
import { Star } from "lucide-react"; // star icon
import { Link } from "react-router-dom"; // product links
import { useProducts } from "@/features/products/hooks"; // data hook
import { Product } from "@/features/products/services"; // product type

type BestSellersRowProps = { // section props
  title?: string;
  subtitle?: string;
};

const BestSellersRow: React.FC<BestSellersRowProps> = ({ // best sellers row
  title = "Best Sellers",
  subtitle = "Most loved picks this week",
}) => {
  const { data: products = [], isLoading, error, refetch } = useProducts(); // load products
  const listRef = React.useRef<HTMLDivElement | null>(null); // scroller ref

  const scrollByAmount = (dx: number) => { // scroll helper
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" }); // smooth scroll
  };

  const visibleProducts = products.slice(0, 10); // demo list

  if (isLoading) return <div className="best-row__loading">Loading...</div>; // loading state
  if (error) {
    return (
      <div className="best-row__error"> {/* error block */}
        <p className="u-text-danger">Error: {error.message}</p> {/* error text */}
        <button className="btn btn-primary btn-sm" onClick={() => { void refetch(); }}>Retry</button> {/* retry */}
      </div>
    );
  }

  return (
    <section className="best-row"> {/* best sellers section */}
      <div className="best-row__header"> {/* header row */}
        <div>
          <div className="best-row__title">{title}</div> {/* title */}
          <div className="best-row__subtitle">{subtitle}</div> {/* subtitle */}
        </div>
        <div className="best-row__actions"> {/* scroll buttons */}
          <button type="button" className="scroll-btn" onClick={() => scrollByAmount(-360)}>
            <span className="scroll-btn__icon scroll-btn__icon--left" aria-hidden="true" />
          </button>
          <button type="button" className="scroll-btn" onClick={() => scrollByAmount(360)}>
            <span className="scroll-btn__icon scroll-btn__icon--right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="best-row__list no-scrollbar"> {/* scrollable list */}
        {visibleProducts.map((product: Product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="best-row__card card card--product"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            <span className="best-row__overlay" aria-hidden="true" /> {/* gradient */}
            <div className="best-row__content"> {/* card content */}
              <div className="best-row__name">{product.title}</div> {/* title */}
              <div className="best-row__rating"> {/* rating */}
                <Star size={14} className="best-row__star" aria-hidden="true" />
                <span className="best-row__rating-text">{product.rating.toFixed(1)}</span>
              </div>
              <div className="best-row__price">${product.price}</div> {/* price */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestSellersRow;
