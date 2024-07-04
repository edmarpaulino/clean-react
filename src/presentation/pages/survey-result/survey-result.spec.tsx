import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { LoadSurveyResultSpy, mockSurveyResultModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
  loadSurveyResultSpy: LoadSurveyResultSpy
  setCurrentAccountMock: typeof jest.fn
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const routes: RouteObject[] = [
    {
      path: '/surveys',
      element: <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/surveys'], initialIndex: 0 })
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: jest.fn() }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
  return {
    router,
    loadSurveyResultSpy,
    setCurrentAccountMock
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const surveyResult = { ...mockSurveyResultModel(), date: new Date('2024-06-23T00:00:00') }
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('day')).toHaveTextContent('23')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jun$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answerWraps = screen.queryAllByTestId('answer-wrap')
    expect(answerWraps[0]).toHaveClass('active')
    expect(answerWraps[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('error'))
    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { router, setCurrentAccountMock } = makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(router.state.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('error'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('survey-result'))
  })
})