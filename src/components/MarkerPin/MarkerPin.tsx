import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Zoom } from '@mui/material'

import type { MarkerPosition } from '@/types'

interface MarkerPinProps {
  position: MarkerPosition
}

export const MarkerPin = ({ position }: MarkerPinProps) => (
  <Zoom in appear>
    <LocationOnIcon
      data-testid="marker-pin"
      aria-hidden="true"
      sx={{
        position: 'absolute',
        left: `${position.xPercent}%`,
        top: `${position.yPercent}%`,
        transform: 'translate(-50%, -100%)',
        fontSize: 40,
        color: 'secondary.main',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.45))',
        pointerEvents: 'none',
      }}
    />
  </Zoom>
)
