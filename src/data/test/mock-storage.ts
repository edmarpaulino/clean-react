import type { SetStorage } from '@/data/protocols/cache'

export class SetStorageMock implements SetStorage {
  public key?: string
  public value?: any

  async set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}
