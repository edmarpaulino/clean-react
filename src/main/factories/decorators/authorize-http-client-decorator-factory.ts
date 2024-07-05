import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdatper } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import type { HttpClient } from '@/data/protocols/http'

export const makeAuthorizeHttpClientDecorator = <T = any>(): HttpClient<T> => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdatper(), makeAxiosHttpClient())
}
