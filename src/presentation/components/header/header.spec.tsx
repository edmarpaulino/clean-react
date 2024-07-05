import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { currentAccountState, Header } from '@/presentation/components'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import { mockAccountModel } from '@/domain/test'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
  setCurrentAccountMock: typeof jest.fn
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Header />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(currentAccountState, mockedState)
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  )
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
