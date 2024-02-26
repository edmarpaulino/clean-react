export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`Campo inválido: ${fieldName}`)
    this.name = 'InvalidFieldError'
  }
}
