import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])
