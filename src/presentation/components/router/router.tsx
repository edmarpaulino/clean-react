import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  const router = createBrowserRouter([
    {
      path: '/login',
      Component: factory.makeLogin
    },
    {
      path: '/signup',
      Component: factory.makeSignUp
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
