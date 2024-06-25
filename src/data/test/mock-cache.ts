import type { GetStorage } from '@/data/protocols/cache'
import { faker } from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  public key?: string
  public value: string = faker.word.sample()

  get(key: string): any {
    this.key = key

    return this.value
  }
}
