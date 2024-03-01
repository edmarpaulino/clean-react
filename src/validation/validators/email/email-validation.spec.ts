import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const field: string = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.adjective() })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if email is valid', () => {
    const field: string = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const field: string = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
