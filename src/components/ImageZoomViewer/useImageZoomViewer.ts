import { useCallback, useState } from 'react'

import type { MarkerPosition } from '@/types'
import { getMarkerPositionFromClick } from '@/utils/markerPosition'
import { clampZoom, DEFAULT_IMAGE_HEIGHT_REM, zoomIn, zoomOut } from '@/utils/zoom'

import type { UseImageZoomViewerResult } from './types'

export const useImageZoomViewer = (): UseImageZoomViewerResult => {
  const [imageHeightRem, setImageHeightRem] = useState(DEFAULT_IMAGE_HEIGHT_REM)
  const [marker, setMarker] = useState<MarkerPosition | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleImageClick: UseImageZoomViewerResult['handleImageClick'] = useCallback((event) => {
    const imageRect = event.currentTarget.getBoundingClientRect()
    const position = getMarkerPositionFromClick(
      { clientX: event.clientX, clientY: event.clientY },
      imageRect,
    )

    if (position) {
      setMarker(position)
    }
  }, [])

  const handleZoomIn = useCallback(() => {
    setImageHeightRem((current) => zoomIn(current))
  }, [])

  const handleZoomOut = useCallback(() => {
    setImageHeightRem((current) => zoomOut(current))
  }, [])

  const handleZoomChange = useCallback((value: number) => {
    setImageHeightRem(clampZoom(value))
  }, [])

  const handleResetZoom = useCallback(() => {
    setImageHeightRem(DEFAULT_IMAGE_HEIGHT_REM)
  }, [])

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((current) => !current)
    setImageHeightRem(DEFAULT_IMAGE_HEIGHT_REM)
  }, [])

  return {
    imageHeightRem,
    marker,
    isFullscreen,
    handleImageClick,
    handleZoomIn,
    handleZoomOut,
    handleZoomChange,
    handleResetZoom,
    handleToggleFullscreen,
  }
}
