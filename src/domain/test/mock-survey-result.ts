import { faker } from '@faker-js/faker'
import type { LoadSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.word.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.image.url(),
      answer: faker.word.sample(),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.word.sample(),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100 }),
      isCurrentAccountAnswer: faker.datatype.boolean()
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
