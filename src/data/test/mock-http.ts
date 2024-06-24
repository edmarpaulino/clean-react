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
  url: faker.internet.url()
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
    return this.response
  }

  reset(): void {
    this.response = this.defaultResponse
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  private readonly defaultResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  public url: string = ''
  public response: HttpResponse<R> = this.defaultResponse

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
