import { faker } from '@faker-js/faker'
import type {
  HttpPostClient,
  HttpPostParams
} from '@/data/protocols/http/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http'

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
