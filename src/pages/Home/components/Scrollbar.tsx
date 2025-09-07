import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/features/products/hooks";
import { Product } from "@/features/products/services";

type ScrollbarProps = {
  count: number;
};

type ProductScrollProps = {
  limit?: number;
  offset?: number;
};

type ProductScrollHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ count }) => {
  const rowRef = React.useRef<ProductScrollHandle | null>(null);

  return (
    <div className="flex-column__grid">
      <h2 className="text-3xl">New Arrivals</h2>

      <div className="mb-3 flex gap-2">
        <button type="button" className="btn btn-secondary" aria-label="Scroll left" onClick={() => rowRef.current?.scrollLeft()}>
          ◀
        </button>
        <button type="button" className="btn btn-secondary" aria-label="Scroll right" onClick={() => rowRef.current?.scrollRight()}>
          ▶
        </button>
      </div>

      <ProductScroll ref={rowRef} offset={count} />
    </div>
  );
};

export default Scrollbar;

const ProductScroll = React.forwardRef<ProductScrollHandle, ProductScrollProps>(
  ({ limit = 8, offset = 0 }, ref) => {
    const { data: products = [] } = useProducts();
    const visibleProducts = products.slice(offset, offset + limit);

    const listRef = React.useRef<HTMLDivElement | null>(null);

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

