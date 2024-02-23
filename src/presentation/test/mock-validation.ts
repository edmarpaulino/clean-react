import type { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  public errorMessage: string | null = null

  validate(fieldName: string, fieldValue: string): string | null {
    return this.errorMessage
  }
}
