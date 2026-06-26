import type { MouseEvent } from 'react'

import type { MarkerPosition } from '@/types'

export interface UseImageZoomViewerResult {
  imageHeightRem: number
  marker: MarkerPosition | null
  isFullscreen: boolean
  handleImageClick: (event: MouseEvent<HTMLImageElement>) => void
  handleZoomIn: () => void
  handleZoomOut: () => void
  handleZoomChange: (value: number) => void
  handleResetZoom: () => void
  handleToggleFullscreen: () => void
}
