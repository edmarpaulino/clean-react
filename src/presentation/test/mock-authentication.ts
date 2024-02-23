import type { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import type { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  private readonly defaultAccount: AccountModel = mockAccountModel()

  public params?: AuthenticationParams
  public account: AccountModel = this.defaultAccount

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
