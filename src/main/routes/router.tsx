import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adpters/current-account-adapter'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'

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
  },
  {
    path: '/surveys/:id',
    Component: makeSurveyResult
  }
])

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot
      initializeState={(snapshot) => {
        snapshot.set(currentAccountState, state)
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default Router
