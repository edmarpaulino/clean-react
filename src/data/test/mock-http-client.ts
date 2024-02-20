import type { HttpPostClient, HttpPostClientParams } from '@/data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  public url?: string
  public body?: object

  async post (params: HttpPostClientParams): Promise<void> {
    this.url = params.url
    this.body = params.body
  }
}
