import { Controller, Get, NotFoundException, Query, Res } from '@nestjs/common';
import { TinkoffService } from './tinkoff.service';
import { TickerDto } from './types/ticker.dto';

@Controller('tinkoff')
export class TinkoffController {
  constructor(private service: TinkoffService) {}

  @Get('accounts')
  async accounts() {
    return this.service.getBrokerAccounts();
  }

  @Get('usedInstruments')
  async usedInstruments() {
    const operations = await this.service.getAllOperations();

    return this.service.getUsedInstruments(operations);
  }

  @Get('overview')
  async overview() {
    // const allTransactions = await this.service.getAllOperations();
    // return this.service.getDistinctOperationTypes(allTransactions);

    return {
      workInProgress: true,
    };
  }

  @Get('statisticsByTicker')
  async statisticsByTicker(@Query() { ticker }: TickerDto) {
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(
        `Не удалось найти инструмент по тикеру ${ticker}`,
      );
    }

    return {
      workInProgress: true,
    };
  }

  @Get('tickerPrice')
  async tickerPrice(@Query() { ticker }: TickerDto): Promise<number> {
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(
        `Не удалось найти инструмент по тикеру ${ticker}`,
      );
    }

    return this.service.getTickerActualPrice(instrument.figi);
  }

  @Get('tickerIcon')
  async tickerIcon(
    @Query() { ticker }: TickerDto,
    @Res() response,
  ): Promise<void> {
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(
        `Не удалось найти инструмент по тикеру ${ticker}`,
      );
    }

    response.redirect(301, this.service.getTickerIconUrl(instrument.isin));
  }

  @Get('tickerIconUrl')
  async tickerIconUrl(@Query() { ticker }: TickerDto): Promise<string> {
    const instrument = await this.service.getInstrumentByTicker(ticker);
    if (!instrument) {
      throw new NotFoundException(
        `Не удалось найти инструмент по тикеру ${ticker}`,
      );
    }

    return this.service.getTickerIconUrl(instrument.isin);
  }
}
