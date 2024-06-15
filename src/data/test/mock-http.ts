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

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  private readonly defaultResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  public url?: string
  public body?: any
  public response: HttpResponse<R> = this.defaultResponse

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }

  reset(): void {
    this.response = this.defaultResponse
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url: string = ''

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}
