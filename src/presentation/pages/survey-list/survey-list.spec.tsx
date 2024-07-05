import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: typeof jest.fn
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <SurveyList loadSurveyList={loadSurveyListSpy} />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => mockAccountModel()
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
    loadSurveyListSpy,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li[data-testid="survey-item-wrap"]')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByTestId('error'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { router, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByTestId('error'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
