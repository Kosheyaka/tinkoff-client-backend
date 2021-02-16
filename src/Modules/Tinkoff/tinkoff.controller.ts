import { Controller, Get, Post } from "@nestjs/common";
import { TinkoffApi } from "./api/tinkoff.api";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffApi) {}

  @Get('userAccounts')
  async userAccounts() {
    return this.service.getUserAccounts();
  }

  @Get('portfolio')
  async portfolio() {
    return this.service.getPortfolio();
  }

  @Post('registerSandbox')
  async registerSandbox() {
    return this.service.postSandboxRegister();
  }
}
