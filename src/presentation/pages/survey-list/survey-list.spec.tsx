import React from 'react'
import { screen, render } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', () => {
    render(<SurveyList />)
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
  })
})
