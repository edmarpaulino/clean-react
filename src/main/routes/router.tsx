import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      Component: makeLogin
    },
    {
      path: '/signup',
      Component: makeSignUp
    },
    {
      path: '/',
      Component: SurveyList
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
