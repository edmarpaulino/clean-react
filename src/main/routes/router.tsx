import React, { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adpters/current-account-adapter'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  const value = useMemo(
    () => ({
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }),
    [setCurrentAccountAdapter, getCurrentAccountAdapter]
  )

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
    <ApiContext.Provider value={value}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

export default Router
