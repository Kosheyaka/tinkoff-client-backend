import { Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('hello')
  async getHello(): Promise<string> {
    return this.testService.getHello();
  }

  @Get('query')
  async getQuery(@Query() query) {
    return query;
  }
}
