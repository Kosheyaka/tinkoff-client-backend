import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  public get<T>(key: string): Promise<T | null> {
    try {
      return this.cacheManager.get(key);
    } catch (e) {
      return null;
    }
  }

  public async set<T>(key: string, value: T, ttl = 5): Promise<T> {
    return this.cacheManager.set(key, value, ttl * 1000);
  }

  public async delete(key: string) {
    return this.cacheManager.del(key);
  }

  public clear(): Promise<void> {
    return this.cacheManager.reset();
  }
}
