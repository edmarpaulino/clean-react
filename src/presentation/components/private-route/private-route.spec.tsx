import React from 'react'
import { render } from '@testing-library/react'
import { type RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom'
import PrivateRoute from './private-route'

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <PrivateRoute />
      }
    ]
    const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
    render(<RouterProvider router={router} />)
    expect(router.state.location.pathname).toBe('/login')
  })
})
