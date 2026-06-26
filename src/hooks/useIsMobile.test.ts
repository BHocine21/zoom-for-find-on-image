import { useMediaQuery } from '@mui/material'
import { renderHook } from '@testing-library/react'

import { useIsMobile } from './useIsMobile'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

const mockedUseMediaQuery = useMediaQuery as jest.Mock

describe('useIsMobile', () => {
  afterEach(() => {
    mockedUseMediaQuery.mockReset()
  })

  it('returns true when the small-screen media query matches', () => {
    mockedUseMediaQuery.mockReturnValue(true)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('returns false when the small-screen media query does not match', () => {
    mockedUseMediaQuery.mockReturnValue(false)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })
})
