import { Box } from '@mui/material'

import worldMap from '@/assets/world-map.jpg'
import { ZoomableImage } from '@/components/ZoomableImage/ZoomableImage'
import { ZoomControls } from '@/components/ZoomControls/ZoomControls'
import { useIsMobile } from '@/hooks/useIsMobile'

import { useImageZoomViewer } from './useImageZoomViewer'

export const ImageZoomViewer = () => {
  const isMobile = useIsMobile()
  const {
    imageHeightRem,
    marker,
    isFullscreen,
    handleImageClick,
    handleZoomIn,
    handleZoomOut,
    handleZoomChange,
    handleResetZoom,
    handleToggleFullscreen,
  } = useImageZoomViewer()

  return (
    <Box
      sx={
        isFullscreen
          ? {
              position: 'fixed',
              inset: 0,
              zIndex: (theme) => theme.zIndex.modal,
              bgcolor: 'common.black',
            }
          : { width: '100%' }
      }
    >
      <ZoomableImage
        src={worldMap}
        alt="Carte du monde"
        heightRem={imageHeightRem}
        marker={marker}
        isFullscreen={isFullscreen}
        onImageClick={handleImageClick}
      />
      <ZoomControls
        heightRem={imageHeightRem}
        isFullscreen={isFullscreen}
        isMobile={isMobile}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomChange={handleZoomChange}
        onReset={handleResetZoom}
        onToggleFullscreen={handleToggleFullscreen}
      />
    </Box>
  )
}
