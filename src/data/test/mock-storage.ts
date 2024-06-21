import type { SetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value?: object

  set(key: string, value: object): void {
    this.key = key
    this.value = value
  }
}
