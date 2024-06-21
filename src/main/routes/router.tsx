import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adpters/current-account-adapter'
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

  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

export default Router
