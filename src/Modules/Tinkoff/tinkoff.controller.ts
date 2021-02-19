import { Controller, Get } from "@nestjs/common";
import { TinkoffService } from "./tinkoff.service";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

  @Get('test')
  async example() {
    // const TeslaCost = 787.38 * 25; // TODO Get actual cost
    const figi = await this.service.getFigiByTicker('TSLA');
    const operations = await this.service.getFullTransactionsHistory(figi);
    const doneOperations = operations.filter((o) => o.status === "Done");
    const acceptedOperations = doneOperations.filter((o) => o.operationType !== "BrokerCommission");

    const commissions = doneOperations.filter((o) => o.operationType === "BrokerCommission");
    const tradingSum: number = this.service.arraySum(acceptedOperations.map((o) => o.payment));
    const commissionsSum: number = this.service.arraySum(commissions.map((o) => o.payment));

    return {
      tradingSum,
      commissionsSum,
    };
  }
}
