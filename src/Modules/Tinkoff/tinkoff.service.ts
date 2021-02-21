import { Injectable } from "@nestjs/common";
import { TinkoffApi } from "./api/tinkoff.api";
import { TinkoffSandboxApi } from "./api/tinkoffSandbox.api";
import { TinkoffApiAbstract } from "./api/tinkoff.api.abs";
import { MarketInstrument, Operation } from "@tinkoff/invest-openapi-js-sdk/build/domain";

@Injectable()
export class TinkoffService {
  constructor(
    private realApi: TinkoffApi,
    private sandBoxApi: TinkoffSandboxApi,
  ) {
    this.api = this.realApi;
  }

  private api: TinkoffApiAbstract;

  private wrapMoney = (money: number) => Math.round(money * 100) / 100;

  public arraySum = (arr: number[]): number =>
    this.wrapMoney(arr.reduce((prev, curr) => prev + this.wrapMoney(curr), 0.00));

  public sandboxMode = (flag: boolean): void => {
    this.api = !flag ? this.realApi : this.sandBoxApi;
  };

  public getBrokerAccountId = async (): Promise<string> => {
    const { payload: { accounts } } = await this.api.userAccounts();
    const { brokerAccountId } = accounts[0];

    return brokerAccountId;
  };

  public getInstrumentByTicker = async (ticker: string): Promise<MarketInstrument> => {
    const { payload: { instruments } } = await this.api.marketSearchByTicker(ticker);

    return instruments[0];
  };

  public getTransactionsHistoryByFigi = async (figi: string): Promise<Operation[]> => {
    const fromDate = new Date(); fromDate.setFullYear(2015);
    const params = {
      from: fromDate.toISOString(),
      to: (new Date()).toISOString(),
      figi,
    };
    const operationsResponse = await this.api.operations(params);
    const { payload: { operations } } = operationsResponse;

    return operations;
  };

  public getTransactionsHistoryFull = async (): Promise<Operation[]> => {
    const fromDate = new Date(); fromDate.setFullYear(2015);
    const params = {
      from: fromDate.toISOString(),
      to: (new Date()).toISOString(),
    };
    const operationsResponse = await this.api.operations(params);
    const { payload: { operations } } = operationsResponse;

    return operations;
  };

  public getTickerAmount = async (ticker: string): Promise<number> => {
    const { payload: { positions } } = await this.api.portfolio();
    const position = positions.find((pos) => pos.ticker === ticker.toUpperCase());

    return position ? position.lots : 0;
  };

  public getTickerActualPrice = async (figi: string): Promise<number> => {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    const dateTo = new Date();
    const from = dateFrom.toISOString();
    const to = dateTo.toISOString();

    const { payload: { candles } } = await this.api.marketCandles({ figi, interval: 'hour', from, to })
    const lastCandle = candles[candles.length - 1];

    return lastCandle.c;
  };

  public getTickerIconUrl = (isin: string): string => `https://static.tinkoff.ru/brands/traiding/${isin}x160.png`;
}
