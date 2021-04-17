import { Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { CacheService } from '../../Utils/cache.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
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
