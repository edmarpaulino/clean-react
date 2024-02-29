import { InvalidFieldError } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly fieldToCompare: string) {}

  validate(value: string): Error | null {
    return new InvalidFieldError(this.fieldToCompare)
  }
}
