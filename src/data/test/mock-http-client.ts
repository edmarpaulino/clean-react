import type { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import type { HttpResponse } from '@/data/protocols/http/http-response'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  private readonly defaultResponse: HttpResponse<R> = { statusCode: HttpStatusCode.ok }

  public url?: string
  public body?: T
  public response: HttpResponse<R> = this.defaultResponse

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }

  reset (): void {
    this.response = this.defaultResponse
  }
}
