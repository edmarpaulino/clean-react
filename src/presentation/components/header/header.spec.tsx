import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'

describe('Header Component', () => {
  test('Should call setCurrentAccount with undefined', () => {
    const setCurrentAccountMock = jest.fn()
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Header />
      }
    ]
    const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
  })
})
