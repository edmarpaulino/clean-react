import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import type { Validation } from '@/presentation/protocols/validation'

export const makeSignUpValidation = (): Validation => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().min(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}
