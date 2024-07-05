import { faker } from '@faker-js/faker'
import type { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import type { SurveyResultModel } from '@/domain/models'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.word.words(10)
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  question: faker.word.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.image.url(),
      answer: faker.word.words(10),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.word.words(2),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100 }),
      isCurrentAccountAnswer: false
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  public callsCount = 0
  public surveyResult = mockSurveyResultModel()

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++

    return this.surveyResult
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  public callsCount = 0
  public params?: SaveSurveyResult.Params
  public surveyResult = mockSurveyResultModel()

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.callsCount++
    this.params = params
    return this.surveyResult
  }
}
