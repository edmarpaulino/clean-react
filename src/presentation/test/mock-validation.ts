import type { Validation } from '@/presentation/protocols/validation'
import { faker } from '@faker-js/faker'

export class ValidationStub implements Validation {
  public readonly errorMessage: string = faker.word.words()

  validate(fieldName: string, fieldValue: string): string | null {
    return this.errorMessage
  }
}
