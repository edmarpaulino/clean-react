import type { RemoteLoadSurveyList } from '@/data/usecases'
import { faker } from '@faker-js/faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
]
