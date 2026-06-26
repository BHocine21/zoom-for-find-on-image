import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import { IconButton, Paper, Slider, Stack } from '@mui/material'

import { MAX_IMAGE_HEIGHT_REM, MIN_IMAGE_HEIGHT_REM, ZOOM_STEP_REM } from '@/utils/zoom'

interface ZoomControlsProps {
  heightRem: number
  isFullscreen: boolean
  isMobile: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomChange: (value: number) => void
  onReset: () => void
  onToggleFullscreen: () => void
}

export const ZoomControls = ({
  heightRem,
  isFullscreen,
  isMobile,
  onZoomIn,
  onZoomOut,
  onZoomChange,
  onReset,
  onToggleFullscreen,
}: ZoomControlsProps) => (
  <Paper
    elevation={isFullscreen ? 0 : 6}
    square
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      py: 1.5,
      px: 2,
      bgcolor: isFullscreen ? 'rgba(0, 0, 0, 0.55)' : 'background.paper',
      backdropFilter: isFullscreen ? 'blur(6px)' : 'none',
      transition: 'background-color 0.2s ease',
    }}
  >
    {!isFullscreen && (
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          aria-label="Réduire le zoom"
          onClick={onZoomOut}
          size={isMobile ? 'small' : 'medium'}
        >
          <ZoomOutIcon />
        </IconButton>
        <Slider
          aria-label="Niveau de zoom"
          value={heightRem}
          min={MIN_IMAGE_HEIGHT_REM}
          max={MAX_IMAGE_HEIGHT_REM}
          step={ZOOM_STEP_REM}
          onChange={(_, value) => onZoomChange(value as number)}
          sx={{ width: isMobile ? 96 : 160 }}
        />
        <IconButton
          aria-label="Augmenter le zoom"
          onClick={onZoomIn}
          size={isMobile ? 'small' : 'medium'}
        >
          <ZoomInIcon />
        </IconButton>
        <IconButton
          aria-label="Réinitialiser le zoom"
          onClick={onReset}
          size={isMobile ? 'small' : 'medium'}
        >
          <RestartAltIcon />
        </IconButton>
      </Stack>
    )}
    <IconButton
      aria-label={isFullscreen ? 'Quitter le plein écran' : 'Activer le plein écran'}
      onClick={onToggleFullscreen}
      sx={{ color: isFullscreen ? 'common.white' : 'inherit' }}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  </Paper>
)
