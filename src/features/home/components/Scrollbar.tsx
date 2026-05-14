import React from "react";
import { useProducts } from "@/features/products/hooks";
import { Product } from "@/features/products/services";
import ProductMediaCard from "./ProductMediaCard";
import { animateScrollLeft, getCardTargetLeft, getNearestCardLeft } from "./product-row-tools";
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
    const dragStateRef = React.useRef({ isDragging: false, didDrag: false, startX: 0, startScrollLeft: 0 }) // mouse drag scroll state

    const scrollByOneCard = (direction: -1 | 1) => {
      const el = listRef.current;
      if (!el) return;
      const targetLeft = getCardTargetLeft(el, direction)
      if (targetLeft === null) return
      animateScrollLeft(el, targetLeft) // controlled smooth snap to exact card start
    };

    const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => { // allow desktop wheel to move the horizontal row
      const el = listRef.current
      if (!el || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      el.scrollBy({ left: event.deltaY, behavior: "auto" })
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => { // allow mouse drag scrolling on desktop
      const el = listRef.current
      if (!el) return
      dragStateRef.current = { isDragging: true, didDrag: false, startX: event.clientX, startScrollLeft: el.scrollLeft }
      el.style.scrollSnapType = "none" // disable snap while dragging so movement stays smooth
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => { // move row while dragging with mouse
      const el = listRef.current
      const dragState = dragStateRef.current
      if (!el || !dragState.isDragging) return
      event.preventDefault()
      if (Math.abs(event.clientX - dragState.startX) > 6) dragState.didDrag = true
      el.scrollLeft = dragState.startScrollLeft - (event.clientX - dragState.startX)
    }

    const stopMouseDrag = () => { // finish drag state cleanly
      const el = listRef.current
      const dragState = dragStateRef.current
      dragState.isDragging = false
      if (!el) return
      if (!dragState.didDrag) {
        el.style.scrollSnapType = "x mandatory" // restore snap directly for normal click release
        return
      }
      const targetLeft = getNearestCardLeft(el)
      if (targetLeft === null) {
        el.style.scrollSnapType = "x mandatory"
        return
      }
      const restoreSnap = () => { el.style.scrollSnapType = "x mandatory" } // restore snap only after smooth motion finishes
      window.requestAnimationFrame(() => {
        animateScrollLeft(el, targetLeft) // start controlled smooth snap after drag cycle ends
        window.setTimeout(restoreSnap, 740)
      })
    }

    const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => { // do not open card after a drag gesture
      if (!dragStateRef.current.didDrag) return
      event.preventDefault()
      event.stopPropagation()
      dragStateRef.current.didDrag = false
    }

    React.useImperativeHandle(ref, () => ({
      scrollLeft: () => scrollByOneCard(-1), // move left by one card
      scrollRight: () => scrollByOneCard(1), // move right by one card
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
      <div ref={listRef} className="scroll-row__card flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar" onWheel={handleWheelScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopMouseDrag} onMouseLeave={stopMouseDrag}> {/* scrollable row */}
        {visibleProducts.map((product: Product) => (
          <ProductMediaCard
            key={product.id}
            product={product}
            onClick={handleCardClick}
          />
        ))}
      </div>
    );
  }
);
