import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators/'
import { ValidationBuilder as sut } from './validation-builder'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field: string = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field: string = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field: string = faker.database.column()
    const lenght: number = faker.number.int({ min: 1, max: 100 })
    const validations = sut.field(field).min(lenght).build()
    expect(validations).toEqual([new MinLengthValidation(field, lenght)])
  })

  test('Should return CompareFieldsValidation', () => {
    const field: string = faker.database.column()
    const fieldToCompare: string = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('Should return a list of validations', () => {
    const field: string = faker.database.column()
    const lenght: number = faker.number.int({ min: 1, max: 100 })
    const validations = sut.field(field).required().min(lenght).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, lenght),
      new EmailValidation(field)
    ])
  })
})
