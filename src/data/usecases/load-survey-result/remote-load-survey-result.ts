import type { RemoteSurveyResultModel } from '@/data/models'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveyResult } from '@/domain/usecases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
    const remoteSurveyResult = httpResponse.body!
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { ...remoteSurveyResult, date: new Date(remoteSurveyResult.date) }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel
}
