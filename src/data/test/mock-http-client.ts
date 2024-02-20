import type { HttpPostClient, HttpPostClientParams } from '@/data/protocols/http/http-post-client'
import type { HttpResponse } from '@/data/protocols/http/http-response'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  private readonly defaultResponse: HttpResponse = { statusCode: HttpStatusCode.ok }

  public url?: string
  public body?: object
  public response: HttpResponse = this.defaultResponse

  async post (params: HttpPostClientParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }

  reset (): void {
    this.response = this.defaultResponse
  }
}
