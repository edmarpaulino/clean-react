import { createContext } from 'react'

import type { AccountModel } from '@/domain/models'

type Context = {
  setCurrentAccount?: (account: AccountModel) => void
}

export default createContext<Context>({})
