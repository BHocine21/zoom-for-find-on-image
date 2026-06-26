import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { ImageZoomViewer } from '@/components/ImageZoomViewer/ImageZoomViewer'

export const HomePage = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <TravelExploreIcon color="primary" sx={{ mr: 1.5 }} aria-hidden="true" />
        <Typography variant="h6" component="h1">
          Zoom for find on image
        </Typography>
      </Toolbar>
    </AppBar>
    <ImageZoomViewer />
  </Box>
)
