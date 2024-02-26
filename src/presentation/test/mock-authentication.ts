import type { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import type { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  public callsCount: number = 0
  public params?: AuthenticationParams
  public account: AccountModel = mockAccountModel()

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return await Promise.resolve(this.account)
  }
}
