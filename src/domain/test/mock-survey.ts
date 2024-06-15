import type { SurveyModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.string.uuid(),
    question: faker.word.words(10),
    answers: [
      {
        image: faker.image.url(),
        answer: faker.word.words(4)
      },
      {
        answer: faker.word.words(5)
      }
    ],
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean()
  }
]
