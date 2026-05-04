import React from "react"; // react types
import { Star } from "lucide-react"; // star icon
import { Link } from "react-router-dom"; // product links
import { useProducts } from "@/features/products/hooks"; // data hook
import { Product } from "@/features/products/services"; // product type

type BestSellersRowProps = { // section props
  title?: string;
  subtitle?: string;
};

const animateScrollLeft = (scrollElement: HTMLDivElement, targetLeft: number, durationMs = 720) => {
  const startLeft = scrollElement.scrollLeft // current scroll position
  const distanceLeft = targetLeft - startLeft // total horizontal travel
  if (Math.abs(distanceLeft) < 1) return

  const startTime = performance.now() // animation start timestamp
  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3) // simple smooth easing

  const step = (currentTime: number) => {
    const elapsedMs = currentTime - startTime // elapsed time
    const progress = Math.min(1, elapsedMs / durationMs) // keep progress between 0 and 1
    scrollElement.scrollLeft = startLeft + distanceLeft * easeOutCubic(progress) // smooth animated position
    if (progress < 1) window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}

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
    const cardElements = Array.from(el.querySelectorAll<HTMLElement>(".best-row__card"))
    if (cardElements.length === 0) return
    const currentScrollLeft = el.scrollLeft
    const currentCardIndex = cardElements.findIndex((cardElement) => cardElement.offsetLeft >= currentScrollLeft - 4)
    const safeCurrentIndex = currentCardIndex >= 0 ? currentCardIndex : 0
    const targetIndex = Math.max(0, Math.min(cardElements.length - 1, safeCurrentIndex + direction))
    const targetLeft = cardElements[targetIndex]?.offsetLeft ?? 0
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
    const cardElements = Array.from(el.querySelectorAll<HTMLElement>(".best-row__card"))
    if (cardElements.length === 0) {
      el.style.scrollSnapType = "x mandatory"
      return
    }
    const nearestCardElement = cardElements.reduce((closestCardElement, currentCardElement) =>
      Math.abs(currentCardElement.offsetLeft - el.scrollLeft) < Math.abs(closestCardElement.offsetLeft - el.scrollLeft) ? currentCardElement : closestCardElement
    )
    const restoreSnap = () => { el.style.scrollSnapType = "x mandatory" } // restore snap only after smooth motion finishes
    const targetLeft = nearestCardElement.offsetLeft
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
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="best-row__card card card--product"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
            aria-label={`View ${product.title}`}
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            onClick={handleCardClick}
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
