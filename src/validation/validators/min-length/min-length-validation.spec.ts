import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import { faker } from '@faker-js/faker'

const minLength: number = 5
const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field: string = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.sample(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field: string = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.word.sample({ length: minLength }) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.word.sample({ length: minLength }) })
    expect(error).toBeFalsy()
  })
})
