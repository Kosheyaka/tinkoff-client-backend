import { Controller, Get, Post } from "@nestjs/common";
import { TinkoffApi } from "./api/tinkoff.api";
import { TinkoffSandboxApi } from "./api/tinkoffSandbox.api";

@Controller('tinkoff')
export class TinkoffController {
  constructor(
    private api: TinkoffApi,
    private sandbox: TinkoffSandboxApi,
  ) {}

  @Post('registerSandbox')
  async registerSandbox() {
    return this.sandbox.postSandboxRegister();
  }

  @Get('portfolio')
  async portfolio() {
    return this.api.getPortfolio();
  }

  @Get('userAccounts')
  async userAccounts() {
    return this.api.getUserAccounts();
  }
}
