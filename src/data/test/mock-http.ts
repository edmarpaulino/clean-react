import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http'
import type { HttpRequest, HttpResponse, HttpMethod, HttpClient } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement<HttpMethod>(['get', 'post', 'put', 'delete']),
  headers: faker.helpers.objectEntry({ anyHeaderProp: 'any_header_value', otherHeaderProp: 'other_header_value' }),
  body: faker.helpers.objectEntry({ anyBodyProp: 'any_body_value', otherBodyProp: 'other_body_value' })
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  public url?: string
  public method?: HttpMethod
  public headers?: any
  public body?: any
  public response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.headers = data.headers
    this.body = data.body

    return this.response
  }
}
