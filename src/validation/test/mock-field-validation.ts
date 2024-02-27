import type { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  public error: Error | null = null

  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    return this.error
  }
}
