import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import { faker } from '@faker-js/faker'

const field: string = faker.database.column()
const makeSut = (): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.adjective())
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
