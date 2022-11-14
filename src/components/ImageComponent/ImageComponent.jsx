import React, { useEffect, useState } from 'react'

import worldMap from '../../Images/world_map.jpg'

const ImageComponent = () => {
  // Marker coordinates [x, y].
  const [marker, setMarker] = useState(null)
  // Image offsets [offsetLeft, offsetTop].
  const [imgOffsets, setImgOffsets] = useState([0, 0])
  // Image height (25rem by default).
  const [imgHeight, setImgHeight] = useState(25)
  // Determine if the full screen is enabled.
  const [mobileMode, setMobileMode] = useState(false)

  useEffect(() => {
    handleResize()
  }, [imgHeight])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  /**
   * Get coordinates on click event.
   *
   * @param object e
   *   Event object.
   *
   * @returns void
   *   update marker state with clicked point.
   */
  const getCoords = (e) => {
    const img = document.getElementById('image')
    // Update image offsets (used after when zoom in/out).
    setImgOffsets([img.offsetLeft, img.offsetTop])

    const x = e.pageX
    const y = e.pageY
    // Update marker state
    setMarker([x, y])
  }

  /**
   * Handle resize event (when zoom in/out)
   *
   * @returns void
   *   Update marker in order to persist its position on image.
   */
  const handleResize = () => {
    // Do nothing if the marker is not displayed.
    if (!marker) {
      return
    }

    const img = document.getElementById('image')
    // Compare between old and new image offsets to determine if zoom in our out.
    if (imgOffsets[0] === 0 || imgOffsets[0] > img.offsetLeft) {
      // Zoom in case.
      setMarker([marker[0] - (imgOffsets[0] - (img.offsetLeft)), marker[1] - (imgOffsets[1] - img.offsetTop)])
    } else {
      // Zoom out case.
      setMarker([marker[0] + (img.offsetLeft - imgOffsets[0]), marker[1] + (img.offsetTop - imgOffsets[1])])
    }
    // Update new image offsets.
    setImgOffsets([img.offsetLeft, img.offsetTop])
  }

  /**
   * Manage click event on zoom in/out buttons.
   *
   * @param string newValue
   *   Equals to +5 for zoom in and -5 for zoom out.
   *
   * @returns void
   *   Update image height if the new value respect min and max value.
   */
  const toggleZoom = (newValue) => {
    const newHeight = imgHeight + parseInt(newValue)
    if (newHeight >= 25 && newHeight < 200) {
      setImgHeight(newHeight)
    }
  }

  /**
   * Manage click event on full screen button.
   *
   * @param boolean activateMobileMode
   *   True if full-screen is activated, false else.
   *
   * @returns void
   *   Switch to full-screen or exit from this mode.
   */
  const toggleMobileMode = (activateMobileMode) => {
    initImageHeight()
    document.body.style.backgroundColor = activateMobileMode ? 'black' : 'white'
    setMobileMode(activateMobileMode)
  }

  /**
   * Manage change event on zoom bar.
   *
   * @param object e
   *   Event object.
   *
   * @returns void
   *   Update image height according to event value.
   */
  const handleChangeZoomBar = (e) => {
    setImgHeight(parseInt(e.target.value))
  }

  /**
   * Init image height to its default value.
   *
   * @returns void
   *   Update image height with its default value (25rem).
   */
  const initImageHeight = () => {
    setImgHeight(25)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem' }}>
        <img
          id='image'
          src={worldMap}
          style={{ height: imgHeight + 'rem', border: '6px solid red' }}
          onClick={getCoords}
        />
        {marker && (
          <div
            id='marker'
            style={{
              position: 'absolute',
              left: ((marker[0]) + 'px'),
              top: ((marker[1]) + 'px'),
              width: '10px',
              height: '10px',
              background: '#000000'
            }}
          />
        )}
      </div>
      <div style={{ position: 'fixed', bottom: '0', width: '100%', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: mobileMode ? 'none' : 'flex', marginRight: '1rem' }}>
            <button onClick={() => { toggleZoom(-5) }}>-</button>
            <div className='control'>
              <input
                style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
                id='zoomSlider'
                type='range'
                min='25'
                max='200'
                step='5'
                value={imgHeight}
                onChange={handleChangeZoomBar}
              />
            </div>
            <button style={{ marginRight: '1rem' }} onClick={() => { toggleZoom(5) }}>+</button>
            <button onClick={initImageHeight}>[ ]</button>
          </div>
          <div>
            <button onClick={() => {
              toggleMobileMode(!mobileMode)
            }}>Full-screen</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageComponent
