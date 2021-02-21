import { Controller, Get, NotFoundException, Query } from "@nestjs/common";
import { TinkoffService } from "./tinkoff.service";

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

  @Get('statisticsByTicker')
  async statisticsByTicker(@Query() query: { ticker: string }) {
    const { ticker } = query;
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(`Не удалось найти инструмент по тикеру ${ticker}`);
    }

    return {};
  }

  @Get('tickerPrice')
  async tickerPrice(@Query() query: { ticker: string }): Promise<number> {
    const { ticker } = query;
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(`Не удалось найти инструмент по тикеру ${ticker}`);
    }

    return this.service.getTickerActualPrice(instrument.figi);
  }
}
