import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdatper = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
