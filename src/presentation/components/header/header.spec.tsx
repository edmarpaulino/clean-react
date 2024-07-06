import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { Header } from '@/presentation/components'
import { createMemoryRouter, type RouteObject, type RouterProvider } from 'react-router-dom'
import { mockAccountModel } from '@/domain/test'
import { renderWithRouter } from '@/presentation/test/render-helper'
import type { AccountModel } from '@/domain/models'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
  setCurrentAccountMock: (account: AccountModel | null | undefined) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Header />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  const { setCurrentAccountMock } = renderWithRouter({ router, account })
  return {
    router,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with undefined', () => {
    const { router, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
