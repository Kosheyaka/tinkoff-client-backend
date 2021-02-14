import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';
// const apiURL = 'https://api-invest.tinkoff.ru/openapi';
// const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
// const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
// const secretToken = process.env.TOKEN; // токен для боевого api
// const sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
// const api = new OpenAPI({
//   apiURL: sandboxApiURL,
//   secretToken: sandboxToken as string,
//   socketURL
// });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
