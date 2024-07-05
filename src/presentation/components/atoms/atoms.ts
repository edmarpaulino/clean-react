import type { AccountModel } from '@/domain/models'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    setCurrentAccount: null as unknown as (account: AccountModel | null | undefined) => void,
    getCurrentAccount: null as unknown as () => AccountModel | undefined
  }
})
