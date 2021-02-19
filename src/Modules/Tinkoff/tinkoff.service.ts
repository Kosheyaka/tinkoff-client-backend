import { Injectable } from "@nestjs/common";
import { TinkoffApi } from "./api/tinkoff.api";
import { TinkoffSandboxApi } from "./api/tinkoffSandbox.api";
import { TinkoffApiAbstract } from "./api/tinkoff.api.abs";
import { Operation } from "@tinkoff/invest-openapi-js-sdk/build/domain";

// TODO Вынести cache куда-нибудь перед реальным использованием
interface CacheFTH {
  [key: string]: Operation[],
}
const cache: CacheFTH = {};

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
    arr.reduce((prev, curr) => this.wrapMoney(prev + this.wrapMoney(curr)), 0.00);

  public sandbox = (flag: boolean): void => {
    this.api = !flag ? this.realApi : this.sandBoxApi;
  };

  public getBrokerAccountId = async (): Promise<string> => {
    const { payload: { accounts } } = await this.api.getUserAccounts();
    const { brokerAccountId } = accounts[0];
    return brokerAccountId;
  };

  public getFigiByTicker = async (ticker: string): Promise<string> => {
    const { payload: { instruments } } = await this.api.marketSearchByTicker(ticker);
    const { figi } = instruments[0];
    return figi;
  };

  public getFullTransactionsHistory = async (figi: string): Promise<Operation[]> => {
    if (cache[figi]) {
      return cache[figi];
    }

    const fromDate = new Date(); fromDate.setFullYear(2015);
    const params = {
      from: fromDate.toISOString(),
      to: (new Date()).toISOString(),
      figi,
    };

    const operationsResponse = await this.api.getOperations(params);
    const { payload: { operations } } = operationsResponse;

    cache[figi] = operations;

    return operations;
  };
}
