/* eslint-disable @typescript-eslint/unbound-method */
import { AxiosHttpClient } from './axios-http-client'
import type axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockGetRequest, mockPostRequest } from '@/data/test'

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
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response', async () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())
      const RESOLVE = 0
      expect(promise).toEqual(mockedAxios.post.mock.results[RESOLVE].value)
    })

    test('Should return correct error on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      const RESOLVE = 0
      expect(promise).toEqual(mockedAxios.post.mock.results[RESOLVE].value)
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.get(mockGetRequest())
      const RESOLVE = 0
      const axiosResponse = await mockedAxios.get.mock.results[RESOLVE].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })
  })
})
