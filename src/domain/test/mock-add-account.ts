import type { AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password: string = faker.internet.password()
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  public callsCount: number = 0
  public params?: AddAccount.Params
  public account: AddAccount.Model = mockAddAccountModel()

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
