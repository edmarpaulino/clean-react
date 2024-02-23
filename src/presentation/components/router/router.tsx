import { Login } from '@/presentation/pages'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login validation={{} as any} authentication={{} as any} />
  }
])

const Router: React.FC = () => {
  return <RouterProvider router={router} />
}

export default Router
