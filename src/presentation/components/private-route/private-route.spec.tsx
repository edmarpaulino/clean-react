import React from 'react'
import { render } from '@testing-library/react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import PrivateRoute from './private-route'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
}

const makeSut = (): SutTypes => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <PrivateRoute />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  render(<RouterProvider router={router} />)
  return {
    router
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { router } = makeSut()
    expect(router.state.location.pathname).toBe('/login')
  })
})
