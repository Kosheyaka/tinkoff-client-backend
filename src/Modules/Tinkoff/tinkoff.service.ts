import { Injectable } from '@nestjs/common';
import { TinkoffApi } from './api/tinkoff.api';
import { TinkoffSandboxApi } from './api/tinkoffSandbox.api';
import { TinkoffApiAbstract } from './api/tinkoff.api.abs';
import {
  MarketInstrument,
  Operation,
  OperationTypeWithCommission,
} from '@tinkoff/invest-openapi-js-sdk';

@Injectable()
export class TinkoffService {
  constructor(
    private realApi: TinkoffApi,
    private sandBoxApi: TinkoffSandboxApi,
  ) {
    this.api = this.realApi;
  }

  private api: TinkoffApiAbstract;

  /**
   * Включает/выключает режим песочницы
   */
  public sandboxMode = (flag: boolean): void => {
    this.api = !flag ? this.realApi : this.sandBoxApi;
  };

  /**
   * Возвращает ID портфеля в системе брокера
   * @todo Добавить возможность работать с 2 портфелями
   */
  public getBrokerAccountId = async (): Promise<string> => {
    const {
      payload: { accounts },
    } = await this.api.userAccounts();
    const { brokerAccountId } = accounts[0];

    return brokerAccountId;
  };

  /**
   * Получить информацию об инструменте по тикеру (строка из 3-4 букв)
   */
  public getInstrumentByTicker = async (
    ticker: string,
  ): Promise<MarketInstrument> => {
    const {
      payload: { instruments },
    } = await this.api.marketSearchByTicker(ticker);

    return instruments[0];
  };

  /**
   * Получить историю транзакций по определенному инструменту
   */
  public getTransactionsHistoryByFigi = async (
    figi: string,
  ): Promise<Operation[]> => {
    const fromDate = new Date();
    fromDate.setFullYear(2015);
    const params = {
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
      figi,
    };
    const operationsResponse = await this.api.operations(params);
    const {
      payload: { operations },
    } = operationsResponse;

    return operations;
  };

  /**
   * Получить полную историю транзакций (с 2015 года)
   */
  public getTransactionsHistoryFull = async (): Promise<Operation[]> => {
    const fromDate = new Date();
    fromDate.setFullYear(2015);
    const params = {
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
    };
    const operationsResponse = await this.api.operations(params);
    const {
      payload: { operations },
    } = operationsResponse;

    return operations;
  };

  /**
   * Количество единиц инструмента в портфеле
   */
  public getTickerAmount = async (ticker: string): Promise<number> => {
    const {
      payload: { positions },
    } = await this.api.portfolio();
    const position = positions.find(
      (pos) => pos.ticker === ticker.toUpperCase(),
    );

    return position ? position.lots : 0;
  };

  /**
   * Последняя цена инструмента
   */
  public getTickerActualPrice = async (figi: string): Promise<number> => {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    const dateTo = new Date();
    const from = dateFrom.toISOString();
    const to = dateTo.toISOString();

    const {
      payload: { candles },
    } = await this.api.marketCandles({ figi, interval: 'hour', from, to });
    const lastCandle = candles[candles.length - 1];

    return lastCandle.c;
  };

  /**
   * Возвращает ссылку на иконку инструмента
   */
  public getTickerIconUrl = (isin: string): string =>
    `https://static.tinkoff.ru/brands/traiding/${isin}x160.png`;

  public getDistinctOperationTypes = (operations: Operation[]): any => {
    const operationTypes: OperationTypeWithCommission[] = [
      ...new Set(operations.map((o) => o.operationType)),
    ];

    return {
      operationTypes,
    };
  };
}
