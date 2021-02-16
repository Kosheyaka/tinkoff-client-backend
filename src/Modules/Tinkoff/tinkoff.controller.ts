import { Controller, Get } from "@nestjs/common";

@Controller()
export class TinkoffController {
  constructor() {}

  @Get('hello')
  getHello(): string {
    return 'This is TinkoffController.getHello!';
  }
}
