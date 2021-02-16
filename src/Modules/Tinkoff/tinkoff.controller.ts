import { Controller, Get, Post } from "@nestjs/common";
import { TinkoffService } from "./tinkoff.service";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

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
