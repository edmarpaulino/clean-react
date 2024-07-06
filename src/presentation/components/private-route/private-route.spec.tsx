import React from 'react'
import { type RouteObject, type RouterProvider, createMemoryRouter } from 'react-router-dom'
import PrivateRoute from './private-route'
import { renderWithRouter } from '@/presentation/test/render-helper'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
}

const makeSut = (returnAccount = true): SutTypes => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PrivateRoute />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  renderWithRouter({ router, returnAccount })
  return {
    router
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { router } = makeSut(false)
    expect(router.state.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { router } = makeSut()
    expect(router.state.location.pathname).toBe('/')
  })
})
