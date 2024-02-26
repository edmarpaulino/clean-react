import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import { faker } from '@faker-js/faker'

const field: string = faker.database.column()
const minLength: number = 5
const makeSut = (): MinLengthValidation => new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.sample({ length: 3 }))
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.sample({ length: minLength }))
    expect(error).toBeFalsy()
  })
})
