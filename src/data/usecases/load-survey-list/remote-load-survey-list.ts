import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import type { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadSurveyList.Model[]>) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
    const remoteSurveys = httpResponse.body ?? []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) => ({ ...remoteSurvey, date: new Date(remoteSurvey.date) }))
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
