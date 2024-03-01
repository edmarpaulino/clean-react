import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: faker.word.sample(), [fieldToCompare]: faker.word.sample() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.word.sample()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })
    expect(error).toBeFalsy()
  })
})
