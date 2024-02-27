import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeAxiosHttpClient = <T, R>(): AxiosHttpClient<T, R> => {
  return new AxiosHttpClient<T, R>()
}
