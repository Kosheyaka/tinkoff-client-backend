import { Controller, Get, NotFoundException, Query, Res } from "@nestjs/common";
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

  @Get('tickerIcon')
  async tickerIcon(
    @Query() query: { ticker: string },
    @Res() response,
  ): Promise<void> {
    const { ticker } = query;
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(`Не удалось найти инструмент по тикеру ${ticker}`);
    }

    response.redirect(301, this.service.getTickerIconUrl(instrument.isin));
  }

  @Get('tickerIconUrl')
  async tickerIconUrl(@Query() query: { ticker: string }): Promise<string> {
    const { ticker } = query;
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(`Не удалось найти инструмент по тикеру ${ticker}`);
    }

    return this.service.getTickerIconUrl(instrument.isin);
  }
}
