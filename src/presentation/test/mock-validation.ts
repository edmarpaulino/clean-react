import type { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  private readonly defaultErrorMessage: string | null = null

  public errorMessage: string | null = this.defaultErrorMessage
  public fieldName: string = ''
  public fieldValue: string = ''

  validate(fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }

  reset(): void {
    this.errorMessage = this.defaultErrorMessage
  }
}
