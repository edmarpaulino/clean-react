import type { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return new RequiredFieldError()
  }
}