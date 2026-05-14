export const animateScrollLeft = (
  scrollElement: HTMLDivElement,
  targetLeft: number,
  durationMs = 720,
) => {
  const startLeft = scrollElement.scrollLeft // Read the current position once at the start.
  const distanceLeft = targetLeft - startLeft
  if (Math.abs(distanceLeft) < 1) return

  const startTime = performance.now() // Use time-based animation so it stays smooth.
  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3)

  const step = (currentTime: number) => {
    const elapsedMs = currentTime - startTime
    const progress = Math.min(1, elapsedMs / durationMs)
    scrollElement.scrollLeft = startLeft + distanceLeft * easeOutCubic(progress)
    if (progress < 1) window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}

export const getCardTargetLeft = (
  scrollElement: HTMLDivElement,
  direction: -1 | 1,
  cardSelector = ".best-row__card",
) => {
  const cardElements = Array.from(scrollElement.querySelectorAll<HTMLElement>(cardSelector))
  if (cardElements.length === 0) return null

  const currentScrollLeft = scrollElement.scrollLeft
  const currentCardIndex = cardElements.findIndex(
    (cardElement) => cardElement.offsetLeft >= currentScrollLeft - 4,
  )
  const safeCurrentIndex = currentCardIndex >= 0 ? currentCardIndex : 0
  const targetIndex = Math.max(
    0,
    Math.min(cardElements.length - 1, safeCurrentIndex + direction),
  )

  return cardElements[targetIndex]?.offsetLeft ?? 0
}

export const getNearestCardLeft = (
  scrollElement: HTMLDivElement,
  cardSelector = ".best-row__card",
) => {
  const cardElements = Array.from(scrollElement.querySelectorAll<HTMLElement>(cardSelector))
  if (cardElements.length === 0) return null

  const nearestCardElement = cardElements.reduce((closestCardElement, currentCardElement) =>
    Math.abs(currentCardElement.offsetLeft - scrollElement.scrollLeft) <
    Math.abs(closestCardElement.offsetLeft - scrollElement.scrollLeft)
      ? currentCardElement
      : closestCardElement
  )

  return nearestCardElement.offsetLeft
}
