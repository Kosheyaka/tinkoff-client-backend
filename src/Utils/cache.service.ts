import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import md5 from 'md5';

export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  private globalKey = (key: string) => md5(key);
  private userKey = (key: string, userId: number) =>
    md5([key, userId].join('.'));

  public async getGlobal<T>(key: string): Promise<T | null> {
    try {
      return this.cacheManager.get<T>(this.globalKey(key));
    } catch (e) {
      return null;
    }
  }

  public async getForUser<T>(key: string, userId: number): Promise<T | null> {
    try {
      return this.cacheManager.get<T>(this.userKey(key, userId));
    } catch (e) {
      return null;
    }
  }

  public async setGlobal<T>(key: string, value: T, ttl = null): Promise<T> {
    return this.cacheManager.set<T>(this.globalKey(key), value, ttl);
  }

  public async setForUser<T>(
    key: string,
    value: T,
    userId: number,
    ttl = null,
  ): Promise<T> {
    return this.cacheManager.set<T>(this.userKey(key, userId), value, ttl);
  }

  public async delete(key: string) {
    return this.cacheManager.del(key);
  }

  public async clear() {
    return this.cacheManager.reset();
  }
}
