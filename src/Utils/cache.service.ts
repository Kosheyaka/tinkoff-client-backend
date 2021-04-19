import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  private userKey = (key: string, userId: number) => `${userId}_${key}`;

  public async getGlobal<T>(key: string): Promise<T | null> {
    try {
      return this.cacheManager.get(key);
    } catch (e) {
      return null;
    }
  }

  public async getForUser<T>(key: string, userId: number): Promise<T | null> {
    try {
      return this.cacheManager.get(this.userKey(key, userId));
    } catch (e) {
      return null;
    }
  }

  public async setGlobal<T>(key: string, value: T, ttl = 300): Promise<T> {
    return this.cacheManager.set(key, value, ttl * 1000);
  }

  public async setForUser<T>(
    key: string,
    value: T,
    userId: number,
    ttl = 5,
  ): Promise<T> {
    return this.cacheManager.set(this.userKey(key, userId), value, ttl * 1000);
  }

  public async delete(key: string) {
    return this.cacheManager.del(key);
  }

  public clear(): Promise<void> {
    return this.cacheManager.reset();
  }
}
