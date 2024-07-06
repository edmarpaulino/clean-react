import React from 'react'
import { render } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'
import type { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type Params = {
  router: React.ComponentProps<typeof RouterProvider>['router']
  account?: AccountModel
  returnAccount?: boolean
}

type Result = {
  setCurrentAccountMock: (account: AccountModel | null | undefined) => void
  getCurrentAccountMock: () => AccountModel | undefined
}

export const renderWithRouter = ({ router, account = mockAccountModel(), returnAccount = true }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = (): AccountModel | undefined => (returnAccount ? account : undefined)

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: getCurrentAccountMock
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
    setCurrentAccountMock,
    getCurrentAccountMock
  }
}
