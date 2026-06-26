export const MIN_IMAGE_HEIGHT_REM = 25
export const MAX_IMAGE_HEIGHT_REM = 200
export const ZOOM_STEP_REM = 5
export const DEFAULT_IMAGE_HEIGHT_REM = MIN_IMAGE_HEIGHT_REM

export const clampZoom = (heightRem: number): number => {
  if (heightRem < MIN_IMAGE_HEIGHT_REM) {
    return MIN_IMAGE_HEIGHT_REM
  }
  if (heightRem > MAX_IMAGE_HEIGHT_REM) {
    return MAX_IMAGE_HEIGHT_REM
  }
  return heightRem
}

export const zoomIn = (currentHeightRem: number): number =>
  clampZoom(currentHeightRem + ZOOM_STEP_REM)

export const zoomOut = (currentHeightRem: number): number =>
  clampZoom(currentHeightRem - ZOOM_STEP_REM)
