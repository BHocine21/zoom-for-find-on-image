import { fireEvent, render, screen } from '@testing-library/react'

import { ZoomControls } from './ZoomControls'

const baseProps = {
  heightRem: 25,
  isFullscreen: false,
  isMobile: false,
  onZoomIn: jest.fn(),
  onZoomOut: jest.fn(),
  onZoomChange: jest.fn(),
  onReset: jest.fn(),
  onToggleFullscreen: jest.fn(),
}

describe('ZoomControls', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls onZoomIn / onZoomOut / onReset when their buttons are clicked', () => {
    render(<ZoomControls {...baseProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Augmenter le zoom' }))
    fireEvent.click(screen.getByRole('button', { name: 'Réduire le zoom' }))
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser le zoom' }))

    expect(baseProps.onZoomIn).toHaveBeenCalledTimes(1)
    expect(baseProps.onZoomOut).toHaveBeenCalledTimes(1)
    expect(baseProps.onReset).toHaveBeenCalledTimes(1)
  })

  it('exposes the current zoom level on the slider', () => {
    render(<ZoomControls {...baseProps} heightRem={50} />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })

  it('calls onToggleFullscreen when the fullscreen button is clicked', () => {
    render(<ZoomControls {...baseProps} />)

    fireEvent.click(screen.getByRole('button', { name: 'Activer le plein écran' }))

    expect(baseProps.onToggleFullscreen).toHaveBeenCalledTimes(1)
  })

  it('hides the zoom slider and shows the exit-fullscreen label in fullscreen mode', () => {
    render(<ZoomControls {...baseProps} isFullscreen />)

    expect(screen.queryByRole('slider')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Quitter le plein écran' })).toBeInTheDocument()
  })
})
