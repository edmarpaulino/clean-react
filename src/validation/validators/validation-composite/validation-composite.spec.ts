import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-comosite'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
  const sut = new ValidationComposite(fieldValidationSpies)
  return {
    sut,
    fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName: string = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const errorMessage: string = faker.word.words()
    fieldValidationSpies[0].error = new Error(errorMessage)
    fieldValidationSpies[1].error = new Error(faker.word.words())
    const error = sut.validate(fieldName, faker.word.sample())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy on success', () => {
    const fieldName: string = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.word.sample())
    expect(error).toBeFalsy()
  })
})
