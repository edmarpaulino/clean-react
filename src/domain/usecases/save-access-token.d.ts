export interface SaveAccessToken {
  save: (accessToken: string | undefined) => Promise<void>
}
