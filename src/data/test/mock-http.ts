import { faker } from '@faker-js/faker'
import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse
} from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.internet.exampleEmail()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: [faker.word.sample()]
})

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
  private readonly defaultResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  public url?: string
  public body?: any
  public response: HttpResponse<R> = this.defaultResponse

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }

  reset(): void {
    this.response = this.defaultResponse
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  private readonly defaultResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  public url: string = ''
  public headers?: any
  public response: HttpResponse<R> = this.defaultResponse

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
