import type { ImageRect, MarkerPosition } from '@/types'

interface ClickPoint {
  clientX: number
  clientY: number
}

/**
 * Converts a click point into a position relative to the image (in %).
 * Percentage-based storage keeps the marker correctly anchored on the
 * image regardless of the image's current zoom level.
 */
export const getMarkerPositionFromClick = (
  point: ClickPoint,
  imageRect: ImageRect,
): MarkerPosition | null => {
  if (imageRect.width <= 0 || imageRect.height <= 0) {
    return null
  }

  const xPercent = ((point.clientX - imageRect.left) / imageRect.width) * 100
  const yPercent = ((point.clientY - imageRect.top) / imageRect.height) * 100

  if (xPercent < 0 || xPercent > 100 || yPercent < 0 || yPercent > 100) {
    return null
  }

  return { xPercent, yPercent }
}
