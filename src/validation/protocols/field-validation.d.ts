export interface FieldValidation {
  readonly field: string
  validate: (input: Record<string, string>) => Error | null
}
