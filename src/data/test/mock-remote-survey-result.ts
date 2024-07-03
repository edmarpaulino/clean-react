import type { RemoteLoadSurveyResult } from '@/data/usecases'
import { faker } from '@faker-js/faker'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.word.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.image.url(),
      answer: faker.word.sample(),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100 })
    },
    {
      answer: faker.word.sample(),
      count: faker.number.int({ min: 0 }),
      percent: faker.number.float({ min: 0, max: 100 })
    }
  ]
})
