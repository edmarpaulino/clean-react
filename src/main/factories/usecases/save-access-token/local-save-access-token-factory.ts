import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/loca-update-current-account'
import type { UpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdatper())
}
