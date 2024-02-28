import type { SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdatper = (): SetStorage => {
  return new LocalStorageAdapter()
}
