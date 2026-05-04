import React from "react"; // react types
import { useProducts } from "@/features/products/hooks"; // data hook
import { Product } from "@/features/products/services"; // product type
import ProductMediaCard from "./ProductMediaCard";
import { animateScrollLeft, getCardTargetLeft, getNearestCardLeft } from "./product-row-tools";

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
  const dragStateRef = React.useRef({ isDragging: false, didDrag: false, startX: 0, startScrollLeft: 0 }) // mouse drag scroll state

  const scrollByOneCard = (direction: -1 | 1) => { // scroll to the next or previous snapped card
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
  };

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
          <button type="button" className="scroll-btn" onClick={() => scrollByOneCard(-1)}>
            <span className="scroll-btn__icon scroll-btn__icon--left" aria-hidden="true" />
          </button>
          <button type="button" className="scroll-btn" onClick={() => scrollByOneCard(1)}>
            <span className="scroll-btn__icon scroll-btn__icon--right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="best-row__list no-scrollbar" onWheel={handleWheelScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopMouseDrag} onMouseLeave={stopMouseDrag}> {/* scrollable list */}
        {visibleProducts.map((product: Product) => (
          <ProductMediaCard
            key={product.id}
            product={product}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellersRow;
