import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import type { SaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdatper())
}
