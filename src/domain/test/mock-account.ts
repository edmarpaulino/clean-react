import type { AuthenticationParams, AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import type { AccountModel } from '@/domain/models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParams = (): AddAccountParams => {
  const password: string = faker.internet.password()
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
  name: faker.person.fullName()
})
