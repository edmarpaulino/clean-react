import type { SetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value?: string

  set(key: string, value: string): void {
    this.key = key
    this.value = value
  }
}
