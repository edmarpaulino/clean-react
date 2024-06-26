import React, { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adpters/current-account-adapter'

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
      Component: makeSurveyList
    }
  ])

  return (
    <ApiContext.Provider value={value}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

export default Router
