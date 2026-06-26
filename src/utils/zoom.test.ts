import {
  clampZoom,
  DEFAULT_IMAGE_HEIGHT_REM,
  MAX_IMAGE_HEIGHT_REM,
  MIN_IMAGE_HEIGHT_REM,
  zoomIn,
  zoomOut,
} from './zoom'

describe('clampZoom', () => {
  it('returns the value unchanged when within bounds', () => {
    expect(clampZoom(50)).toBe(50)
  })

  it('clamps to the minimum when below the lower bound', () => {
    expect(clampZoom(0)).toBe(MIN_IMAGE_HEIGHT_REM)
  })

  it('clamps to the maximum when above the upper bound', () => {
    expect(clampZoom(500)).toBe(MAX_IMAGE_HEIGHT_REM)
  })

  it('treats the bounds themselves as valid', () => {
    expect(clampZoom(MIN_IMAGE_HEIGHT_REM)).toBe(MIN_IMAGE_HEIGHT_REM)
    expect(clampZoom(MAX_IMAGE_HEIGHT_REM)).toBe(MAX_IMAGE_HEIGHT_REM)
  })
})

describe('zoomIn', () => {
  it('increases the height by one step', () => {
    expect(zoomIn(DEFAULT_IMAGE_HEIGHT_REM)).toBe(DEFAULT_IMAGE_HEIGHT_REM + 5)
  })

  it('never exceeds the maximum', () => {
    expect(zoomIn(MAX_IMAGE_HEIGHT_REM)).toBe(MAX_IMAGE_HEIGHT_REM)
  })
})

describe('zoomOut', () => {
  it('decreases the height by one step', () => {
    expect(zoomOut(50)).toBe(45)
  })

  it('never goes below the minimum', () => {
    expect(zoomOut(MIN_IMAGE_HEIGHT_REM)).toBe(MIN_IMAGE_HEIGHT_REM)
  })
})
