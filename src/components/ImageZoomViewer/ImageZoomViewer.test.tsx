import { createTheme, ThemeProvider } from '@mui/material'
import { fireEvent, render, screen } from '@testing-library/react'

import { ImageZoomViewer } from './ImageZoomViewer'

const theme = createTheme()

const renderViewer = () =>
  render(<ThemeProvider theme={theme}>{<ImageZoomViewer />}</ThemeProvider>)

const mockImageRect = () => {
  const image = screen.getByRole('img')
  jest.spyOn(image, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 400,
    height: 200,
    right: 400,
    bottom: 200,
    x: 0,
    y: 0,
    toJSON: () => '',
  } as DOMRect)
  return image
}

describe('ImageZoomViewer', () => {
  it('places a marker where the image is clicked', () => {
    renderViewer()
    const image = mockImageRect()

    fireEvent.click(image, { clientX: 200, clientY: 100 })

    expect(screen.getByTestId('marker-pin')).toBeInTheDocument()
  })

  it('increases the zoom level when the zoom-in button is clicked', () => {
    renderViewer()

    fireEvent.click(screen.getByRole('button', { name: 'Augmenter le zoom' }))

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
  })

  it('hides the zoom slider while in fullscreen mode', () => {
    renderViewer()

    fireEvent.click(screen.getByRole('button', { name: 'Activer le plein écran' }))

    expect(screen.queryByRole('slider')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Quitter le plein écran' })).toBeInTheDocument()
  })
})
