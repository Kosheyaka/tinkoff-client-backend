import { Controller, Post } from "@nestjs/common";
import { TinkoffService } from "./tinkoff.service";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

  @Post('registerSandbox')
  async registerSandbox() {
    return this.service.sandboxRegister();
  }
}
