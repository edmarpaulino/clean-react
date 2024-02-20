export namespace HttpPostClient {
  export type Params = {
    url: string
  }
}

export interface HttpPostClient {
  post: (params: HttpPostClient.Params) => Promise<void>
}
