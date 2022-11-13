import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

const boot = () => {
  const root = createRoot(document.getElementById('root'))

  root.render(
    <App />
  )
}

boot()
