import { UnexpectedError } from '@/domain/errors'
import type { AccountModel } from '@/domain/models'
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  const localStorageAdapter = makeLocalStorageAdatper()
  localStorageAdapter.set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  const localStorageAdapter = makeLocalStorageAdatper()
  const account = localStorageAdapter.get('account')
  return account
}
