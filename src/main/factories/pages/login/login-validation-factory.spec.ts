import { ValidationComposite } from '@/validation/validators/validation-composite/validation-comosite'
import { makeLoginValidation } from './login-validation-factory'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})