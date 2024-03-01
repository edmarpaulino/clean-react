import { InvalidFieldError } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: Record<string, string>): Error | null {
    return input[this.field]?.length < this.minLength ? new InvalidFieldError() : null
  }
}
