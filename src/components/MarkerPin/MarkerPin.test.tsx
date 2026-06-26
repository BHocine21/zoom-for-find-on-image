import { render, screen } from '@testing-library/react'

import { MarkerPin } from './MarkerPin'

describe('MarkerPin', () => {
  it('positions itself at the given percentage coordinates', () => {
    render(<MarkerPin position={{ xPercent: 25, yPercent: 75 }} />)

    const pin = screen.getByTestId('marker-pin')
    expect(pin).toHaveStyle({ left: '25%', top: '75%' })
  })

  it('is hidden from assistive technology since it is a visual annotation only', () => {
    render(<MarkerPin position={{ xPercent: 50, yPercent: 50 }} />)

    expect(screen.getByTestId('marker-pin')).toHaveAttribute('aria-hidden', 'true')
  })
})
