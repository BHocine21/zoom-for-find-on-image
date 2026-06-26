import { getMarkerPositionFromClick } from './markerPosition'

const imageRect = { left: 100, top: 50, width: 200, height: 100 }

describe('getMarkerPositionFromClick', () => {
  it('returns the center percentage for a click in the middle of the image', () => {
    expect(getMarkerPositionFromClick({ clientX: 200, clientY: 100 }, imageRect)).toEqual({
      xPercent: 50,
      yPercent: 50,
    })
  })

  it('returns 0%/0% for a click on the top-left corner', () => {
    expect(getMarkerPositionFromClick({ clientX: 100, clientY: 50 }, imageRect)).toEqual({
      xPercent: 0,
      yPercent: 0,
    })
  })

  it('returns 100%/100% for a click on the bottom-right corner', () => {
    expect(getMarkerPositionFromClick({ clientX: 300, clientY: 150 }, imageRect)).toEqual({
      xPercent: 100,
      yPercent: 100,
    })
  })

  it('returns null when the click falls outside the image bounds', () => {
    expect(getMarkerPositionFromClick({ clientX: 50, clientY: 50 }, imageRect)).toBeNull()
  })

  it('returns null when the image has no measurable size', () => {
    expect(
      getMarkerPositionFromClick(
        { clientX: 10, clientY: 10 },
        { left: 0, top: 0, width: 0, height: 0 },
      ),
    ).toBeNull()
  })
})
