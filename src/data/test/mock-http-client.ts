import type { HttpPostClient } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  public params?: HttpPostClient.Params

  async post (params: HttpPostClient.Params): Promise<void> {
    this.params = params
  }
}
