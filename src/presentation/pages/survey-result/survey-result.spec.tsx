import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { createMemoryRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

const makeSut = (): void => {
  const routes: RouteObject[] = [
    {
      path: '/surveys',
      element: <SurveyResult />
    }
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/surveys'], initialIndex: 0 })
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: jest.fn() }}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
