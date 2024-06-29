import { faker } from '@faker-js/faker'
import type { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyList = (): LoadSurveyList.Model[] => [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()]

export class LoadSurveyListSpy implements LoadSurveyList {
  public callsCount = 0
  public surveys = mockSurveyList()

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++

    return this.surveys
  }
}
