import { faker } from '@faker-js/faker'
import type { RemoteSurveyResultModel } from '@/data/models'

export const mockRemoteSurveyResultModel = (): RemoteSurveyResultModel => ({
  question: faker.word.words(10),
  date: faker.date.recent().toISOString(),
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
