import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Zoom } from '@mui/material'

import type { MarkerPosition } from '@/types'

interface MarkerPinProps {
  position: MarkerPosition
}

export const MarkerPin = ({ position }: MarkerPinProps) => (
  // The anchor offset lives on this wrapper, not on the icon: MUI's Zoom transition sets its
  // own inline `transform: scale(...)` on the child it animates, which would silently override
  // an anchoring `translate(...)` declared on that same element.
  <Box
    data-testid="marker-pin"
    aria-hidden="true"
    sx={{
      position: 'absolute',
      left: `${position.xPercent}%`,
      top: `${position.yPercent}%`,
      transform: 'translate(-50%, -100%)',
      lineHeight: 0,
      pointerEvents: 'none',
    }}
  >
    <Zoom in appear>
      <LocationOnIcon
        sx={{
          display: 'block',
          fontSize: 40,
          color: 'secondary.main',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.45))',
        }}
      />
    </Zoom>
  </Box>
)
