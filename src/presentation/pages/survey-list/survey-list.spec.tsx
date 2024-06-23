import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import type { SurveyModel } from '@/domain/models'
import { mockSurveyList } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  public callsCount = 0
  public surveys = mockSurveyList()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++

    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
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
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })
})
