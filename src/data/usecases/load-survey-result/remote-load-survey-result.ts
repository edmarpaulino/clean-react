import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveyResult } from '@/domain/usecases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
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
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
