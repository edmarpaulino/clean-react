import { faker } from '@faker-js/faker'

import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'
import type { AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.helpers.objectEntry<AccountModel>
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value))
  })
})
