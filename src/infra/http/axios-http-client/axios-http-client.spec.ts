/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosHttpClient } from './axios-http-client'
import type axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockHttpRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.request(request)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      headers: request.headers,
      data: request.body
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    const RESOLVE = 0
    const axiosResponse = await mockedAxios.request.mock.results[RESOLVE].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.request(mockHttpRequest())
    const RESOLVE = 0
    expect(promise).toEqual(mockedAxios.request.mock.results[RESOLVE].value)
  })
})
