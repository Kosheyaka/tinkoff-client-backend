import { Controller, Get, Query } from '@nestjs/common';
import { DevService } from './dev.service';
import { CacheService } from '../../Utils/cache.service';

@Controller('test')
export class DevController {
  constructor(
    private readonly testService: DevService,
    private readonly cacheService: CacheService,
  ) {}

  @Get('hello')
  async getHello(): Promise<string> {
    return this.testService.getHello();
  }

  @Get('query')
  async getQuery(@Query() query) {
    return query;
  }

  @Get('cache')
  async getCache() {
    type TestValue = { value: boolean };
    const key = 'testKey';
    const value: TestValue = { value: true };

    await this.cacheService.setGlobal<TestValue>(key, value);
    return this.cacheService.getGlobal<TestValue>(key);
  }
}
