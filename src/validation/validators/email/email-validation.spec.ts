import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('invalid_email@mail.com')
    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
