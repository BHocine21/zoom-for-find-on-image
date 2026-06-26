import { Box } from '@mui/material'
import type { MouseEvent } from 'react'

import { MarkerPin } from '@/components/MarkerPin/MarkerPin'
import type { MarkerPosition } from '@/types'

interface ZoomableImageProps {
  src: string
  alt: string
  heightRem: number
  marker: MarkerPosition | null
  isFullscreen: boolean
  onImageClick: (event: MouseEvent<HTMLImageElement>) => void
}

export const ZoomableImage = ({
  src,
  alt,
  heightRem,
  marker,
  isFullscreen,
  onImageClick,
}: ZoomableImageProps) => (
  <Box
    sx={{
      display: 'flex',
      // "safe center" falls back to start-alignment once content overflows, so the
      // beginning of the image never becomes unreachable by scrolling (a known flexbox
      // centering pitfall — plain "center" can clip overflow on one side permanently).
      justifyContent: 'safe center',
      alignItems: 'flex-start',
      width: '100%',
      height: isFullscreen ? '100vh' : { xs: '70vh', sm: '32rem' },
      overflow: 'auto',
      bgcolor: isFullscreen ? 'common.black' : 'transparent',
      pt: isFullscreen ? 4 : 6,
      pb: 12,
      transition: 'background-color 0.2s ease',
    }}
  >
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Box
        component="img"
        id="image"
        src={src}
        alt={alt}
        // The image acts as a click-to-pin surface, like a map — placing a marker has no
        // meaningful keyboard equivalent; all other controls remain fully keyboard accessible.
        onClick={onImageClick}
        sx={{
          height: `${heightRem}rem`,
          maxWidth: 'none',
          display: 'block',
          borderRadius: 2,
          boxShadow: 6,
          cursor: 'crosshair',
          transition: 'height 0.2s ease',
        }}
      />
      {marker && <MarkerPin position={marker} />}
    </Box>
  </Box>
)
