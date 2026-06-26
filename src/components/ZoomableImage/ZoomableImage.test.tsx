import { fireEvent, render, screen } from '@testing-library/react'

import { ZoomableImage } from './ZoomableImage'

describe('ZoomableImage', () => {
  it('renders the image with the given source, alt text and height', () => {
    render(
      <ZoomableImage
        src="/world-map.jpg"
        alt="Carte du monde"
        heightRem={40}
        marker={null}
        isFullscreen={false}
        onImageClick={jest.fn()}
      />,
    )

    const image = screen.getByRole('img', { name: 'Carte du monde' })
    expect(image).toHaveAttribute('src', '/world-map.jpg')
    expect(image).toHaveStyle({ height: '40rem' })
  })

  it('calls onImageClick when the image is clicked', () => {
    const onImageClick = jest.fn()
    render(
      <ZoomableImage
        src="/world-map.jpg"
        alt="Carte du monde"
        heightRem={25}
        marker={null}
        isFullscreen={false}
        onImageClick={onImageClick}
      />,
    )

    fireEvent.click(screen.getByRole('img'))

    expect(onImageClick).toHaveBeenCalledTimes(1)
  })

  it('renders the marker pin when a marker position is provided', () => {
    render(
      <ZoomableImage
        src="/world-map.jpg"
        alt="Carte du monde"
        heightRem={25}
        marker={{ xPercent: 10, yPercent: 20 }}
        isFullscreen={false}
        onImageClick={jest.fn()}
      />,
    )

    expect(screen.getByTestId('marker-pin')).toBeInTheDocument()
  })

  it('does not render a marker pin when there is no marker', () => {
    render(
      <ZoomableImage
        src="/world-map.jpg"
        alt="Carte du monde"
        heightRem={25}
        marker={null}
        isFullscreen={false}
        onImageClick={jest.fn()}
      />,
    )

    expect(screen.queryByTestId('marker-pin')).not.toBeInTheDocument()
  })
})
