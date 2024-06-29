import { createContext } from 'react'

import type { AccountModel } from '@/domain/models'

type Context = {
  setCurrentAccount?: (account: AccountModel | null | undefined) => void
  getCurrentAccount?: () => AccountModel | undefined
}

export default createContext<Context>({})
