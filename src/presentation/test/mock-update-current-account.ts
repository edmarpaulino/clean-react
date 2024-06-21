import type { AccountModel } from '@/domain/models'
import type { UpdateCurrentAccount } from '@/domain/usecases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  public account?: AccountModel

  async save(account?: AccountModel): Promise<void> {
    this.account = account
  }
}
