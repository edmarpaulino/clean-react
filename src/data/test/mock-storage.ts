import type { SetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value?: string

  async set(key: string, value: string): Promise<void> {
    this.key = key
    this.value = value
  }
}
