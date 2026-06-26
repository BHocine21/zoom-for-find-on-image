import { createTheme, ThemeProvider } from '@mui/material'
import { render, screen } from '@testing-library/react'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders the application title and the zoomable map image', () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <HomePage />
      </ThemeProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Zoom for find on image' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Carte du monde' })).toBeInTheDocument()
  })
})
