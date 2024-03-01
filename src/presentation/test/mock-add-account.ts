import type { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import type { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  public params?: AddAccountParams
  public account: AccountModel = mockAccountModel()

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
