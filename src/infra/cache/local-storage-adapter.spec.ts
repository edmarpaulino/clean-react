import { faker } from '@faker-js/faker'

import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { content: faker.string.uuid() }
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.remoteItem if has no value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, null)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { content: faker.string.uuid() }
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })

  test('Should return null on localStorage.getItem failure', () => {
    const sut = makeSut()
    const key = faker.database.column()
    jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(null)
    const obj = sut.get(key)
    expect(obj).toEqual(null)
  })
})
