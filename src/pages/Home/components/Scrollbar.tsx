import React from "react";
import { Link } from "react-router-dom";
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
  const rowRef = React.useRef<ProductScrollHandle | null>(null); // holds methods to scroll left/right (ref)

  return (
    <div className="flex-column__grid">
      {title ? <h2 className="text-3xl">{title}</h2> : null}

      <div className="mb-3 flex gap-2">
        <button type="button" className="btn btn-secondary" aria-label="Scroll left" onClick={() => rowRef.current?.scrollLeft()}>
          ◀
        </button>
        <button type="button" className="btn btn-secondary" aria-label="Scroll right" onClick={() => rowRef.current?.scrollRight()}>
          ▶
        </button>
      </div>

      {/* render the scrolling row starting at an offset (offset) */}
      <ProductScroll ref={rowRef} offset={offset} />
    </div>
  );
};

export default Scrollbar;

// inner component exposes imperative methods via ref (imperative handle)
const ProductScroll = React.forwardRef<ProductScrollHandle, ProductScrollProps>(
  ({ limit = 8, offset = 0 }, ref) => {
    const { data: products = [] } = useProducts(); // fetch products (data hook)
    const visibleProducts = products.slice(offset, offset + limit); // choose window of products (slice)

    const listRef = React.useRef<HTMLDivElement | null>(null); // reference to the scrollable container (ref)

    const scrollByAmount = (dx: number) => {
      const el = listRef.current;
      if (!el) return;
      el.scrollBy({ left: dx, behavior: "smooth" });
    };

    React.useImperativeHandle(ref, () => ({
      scrollLeft: () => scrollByAmount(-320),
      scrollRight: () => scrollByAmount(320),
    }));

    return (
      <div ref={listRef} className="scroll-row__card flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
        {visibleProducts.map((product: Product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="relative shrink-0 rounded-lg overflow-hidden min-w-[250px] min-h-[180px] bg-cover bg-center snap-start"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
            <div className="relative p-3 text-white">
              <p className="font-semibold line-clamp-2">{product.title}</p>
              <p className="text-brand-orange font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
);
