import { SignUp } from '@/presentation/pages'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }) => {
  const router = createBrowserRouter([
    {
      path: '/login',
      Component: makeLogin
    },
    {
      path: '/signup',
      element: <SignUp validation={{} as any} addAccount={{} as any} saveAccessToken={{} as any} />
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
