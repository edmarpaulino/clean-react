import React from 'react'
import { screen, render } from '@testing-library/react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
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
})
