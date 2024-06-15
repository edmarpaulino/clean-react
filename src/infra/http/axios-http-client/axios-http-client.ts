import type {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
