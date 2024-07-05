import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { currentAccountState, IconName } from '@/presentation/components'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  router: React.ComponentProps<typeof RouterProvider>['router']
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <SurveyItem survey={survey} />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 0 })
  const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: jest.fn() }
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
    router
  }
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: true, date: new Date('2024-06-23T00:00:00') }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('23')
    expect(screen.getByTestId('month')).toHaveTextContent(/^jun$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2024')
  })

  test('Should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: false, date: new Date('2023-12-07T00:00:00') }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('07')
    expect(screen.getByTestId('month')).toHaveTextContent(/^dez$/)
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { router } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(router.state.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
