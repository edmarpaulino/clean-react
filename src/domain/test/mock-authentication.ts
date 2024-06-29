import type { Authentication } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { mockAccountModel } from '@/domain/test'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export class AuthenticationSpy implements Authentication {
  public callsCount: number = 0
  public params?: Authentication.Params
  public account: Authentication.Model = mockAuthenticationModel()

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
