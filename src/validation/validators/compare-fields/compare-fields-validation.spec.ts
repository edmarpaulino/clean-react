import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(faker.database.column(), fieldToCompare)
}

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldToCompare = faker.word.sample()
    const sut = makeSut(fieldToCompare)
    const error = sut.validate(faker.word.sample())
    expect(error).toEqual(new InvalidFieldError(fieldToCompare))
  })
})
