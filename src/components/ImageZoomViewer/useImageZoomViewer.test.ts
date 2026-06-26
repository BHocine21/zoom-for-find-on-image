import { act, renderHook } from '@testing-library/react'
import type { MouseEvent } from 'react'

import { DEFAULT_IMAGE_HEIGHT_REM, MAX_IMAGE_HEIGHT_REM, MIN_IMAGE_HEIGHT_REM } from '@/utils/zoom'

import { useImageZoomViewer } from './useImageZoomViewer'

const buildClickEvent = (
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
) =>
  ({
    clientX,
    clientY,
    currentTarget: {
      getBoundingClientRect: () => rect,
    },
  }) as unknown as MouseEvent<HTMLImageElement>

describe('useImageZoomViewer', () => {
  it('starts with the default zoom, no marker, and fullscreen off', () => {
    const { result } = renderHook(() => useImageZoomViewer())

    expect(result.current.imageHeightRem).toBe(DEFAULT_IMAGE_HEIGHT_REM)
    expect(result.current.marker).toBeNull()
    expect(result.current.isFullscreen).toBe(false)
  })

  it('zooms in and out by one step, clamped to the bounds', () => {
    const { result } = renderHook(() => useImageZoomViewer())

    act(() => result.current.handleZoomIn())
    expect(result.current.imageHeightRem).toBe(DEFAULT_IMAGE_HEIGHT_REM + 5)

    act(() => result.current.handleZoomOut())
    act(() => result.current.handleZoomOut())
    expect(result.current.imageHeightRem).toBe(MIN_IMAGE_HEIGHT_REM)
  })

  it('sets the zoom directly from the zoom bar, clamped to the max', () => {
    const { result } = renderHook(() => useImageZoomViewer())

    act(() => result.current.handleZoomChange(9999))
    expect(result.current.imageHeightRem).toBe(MAX_IMAGE_HEIGHT_REM)
  })

  it('resets the zoom to its default value', () => {
    const { result } = renderHook(() => useImageZoomViewer())

    act(() => result.current.handleZoomChange(150))
    act(() => result.current.handleResetZoom())

    expect(result.current.imageHeightRem).toBe(DEFAULT_IMAGE_HEIGHT_REM)
  })

  it('places a marker at the clicked percentage of the image', () => {
    const { result } = renderHook(() => useImageZoomViewer())
    const rect = { left: 0, top: 0, width: 200, height: 100 }

    act(() => result.current.handleImageClick(buildClickEvent(100, 50, rect)))

    expect(result.current.marker).toEqual({ xPercent: 50, yPercent: 50 })
  })

  it('ignores clicks that resolve outside the image bounds', () => {
    const { result } = renderHook(() => useImageZoomViewer())
    const rect = { left: 0, top: 0, width: 200, height: 100 }

    act(() => result.current.handleImageClick(buildClickEvent(-10, -10, rect)))

    expect(result.current.marker).toBeNull()
  })

  it('toggles fullscreen and resets the zoom level', () => {
    const { result } = renderHook(() => useImageZoomViewer())

    act(() => result.current.handleZoomChange(150))
    act(() => result.current.handleToggleFullscreen())

    expect(result.current.isFullscreen).toBe(true)
    expect(result.current.imageHeightRem).toBe(DEFAULT_IMAGE_HEIGHT_REM)

    act(() => result.current.handleToggleFullscreen())
    expect(result.current.isFullscreen).toBe(false)
  })
})
