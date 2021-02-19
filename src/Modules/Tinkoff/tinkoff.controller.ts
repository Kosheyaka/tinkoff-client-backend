import { Controller, Get } from "@nestjs/common";
import { TinkoffService } from "./tinkoff.service";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

  @Get('test')
  async example() {
    this.service.sandbox(false);
    // const brokerAccountId = await this.service.getBrokerAccountId();
    const figi = await this.service.getFigiByTicker('tsla');
    const operations = await this.service.getFullTransactionsHistory(figi);

    return [
      operations[0],
    ];
  }
}
