import { Injectable, NotFoundException } from '@nestjs/common';
import { TinkoffApi } from './api/tinkoff.api';
import { CacheService } from '../../Utils/cache.service';
import {
  MarketInstrument,
  Operation,
  OperationTypeWithCommission,
  UserAccount,
} from '@tinkoff/invest-openapi-js-sdk';
import { launchDate } from './tinkoff.const';
import { CacheTTL } from 'src/Utils/const';
import { sortByKeyASC } from '../../Utils/array.helper';

@Injectable()
export class TinkoffService {
  constructor(
    private readonly api: TinkoffApi,
    private readonly cache: CacheService,
  ) {}

  /**
   * Возвращает ID портфеля в системе брокера
   */
  public getBrokerAccounts = async (): Promise<UserAccount[]> => {
    const cacheKey = 'TS.getBrokerAccounts';
    const cache = await this.cache.getGlobal<UserAccount[]>(cacheKey);
    if (cache) {
      return cache;
    }

    const {
      payload: { accounts },
    } = await this.api.userAccounts();

    await this.cache.setGlobal<UserAccount[]>(cacheKey, accounts);
    return accounts;
  };

  /**
   * Получить информацию об инструменте по тикеру (строка из 3-4 букв)
   */
  public getInstrumentByTicker = async (
    ticker: string,
  ): Promise<MarketInstrument> => {
    const cacheKey = `TS.getInstrumentByTicker.${ticker}`;
    const cache = await this.cache.getGlobal<MarketInstrument>(cacheKey);
    if (cache) {
      return cache;
    }

    const {
      payload: { instruments },
    } = await this.api.marketSearchByTicker(ticker);

    await this.cache.setGlobal<MarketInstrument>(cacheKey, instruments[0]);
    return instruments[0];
  };

  /**
   * Получить информацию об инструменте по тикеру (строка из 3-4 букв)
   */
  public getInstrumentByFigi = async (
    figi: string,
  ): Promise<MarketInstrument> => {
    const cacheKey = `TS.getInstrumentByFigi.${figi}`;
    const cache = await this.cache.getGlobal<MarketInstrument>(cacheKey);
    if (cache) {
      return cache;
    }

    const { payload: instrument } = await this.api.marketSearchByFigi(figi);

    if (!instrument) {
      throw new NotFoundException(
        `Не удалось найти инструмент по figi = ${figi}`,
      );
    }

    await this.cache.setGlobal<MarketInstrument>(cacheKey, instrument);
    return instrument;
  };

  /**
   * Получить историю транзакций по определенному инструменту
   */
  public getOperationsByFigi = async (figi: string): Promise<Operation[]> => {
    const cacheKey = `TS.getOperationsByFigi.${figi}`;
    const cache = await this.cache.getGlobal<Operation[]>(cacheKey);
    if (cache) {
      return cache;
    }

    const operationsResponse = await this.api.operations({
      from: launchDate.toISOString(),
      to: new Date().toISOString(),
      figi,
    });
    const {
      payload: { operations },
    } = operationsResponse;

    await this.cache.setGlobal<Operation[]>(cacheKey, operations);
    return operations;
  };

  /**
   * Получить полную историю транзакций (с 2015 года)
   */
  public getAllOperations = async (): Promise<Operation[]> => {
    const cacheKey = 'TS.getAllOperations';
    const cache = await this.cache.getGlobal<Operation[]>(cacheKey);
    if (cache) {
      return cache;
    }

    const operationsResponse = await this.api.operations({
      from: launchDate.toISOString(),
      to: new Date().toISOString(),
    });
    const {
      payload: { operations },
    } = operationsResponse;

    await this.cache.setGlobal<Operation[]>(cacheKey, operations);
    return operations;
  };

  /**
   * Количество единиц инструмента в портфеле
   */
  public getTickerAmount = async (ticker: string): Promise<number> => {
    const cacheKey = `TS.getTickerAmount.${ticker}`;
    const cache = await this.cache.getGlobal<number>(cacheKey);
    if (cache) {
      return cache;
    }

    const {
      payload: { positions },
    } = await this.api.portfolio();
    const position = positions.find(
      (pos) => pos.ticker === ticker.toUpperCase(),
    );

    const amount: number = position ? position.lots : 0;
    await this.cache.setGlobal<number>(cacheKey, amount);
    return amount;
  };

  /**
   * Последняя цена инструмента
   */
  public getTickerActualPrice = async (figi: string): Promise<number> => {
    const cacheKey = `TS.getTickerActualPrice.${figi}`;
    const cache = await this.cache.getGlobal<number>(cacheKey);
    if (cache) {
      return cache;
    }

    const from = this.sevenDaysAgo().toISOString();
    const to = new Date().toISOString();

    const {
      payload: { candles },
    } = await this.api.marketCandles({ figi, interval: 'hour', from, to });
    const lastCandle = candles[candles.length - 1];

    await this.cache.setGlobal<number>(cacheKey, lastCandle.c, CacheTTL.min);
    return lastCandle.c;
  };

  /**
   * Возвращает ссылку на иконку инструмента
   */
  public getTickerIconUrl = (isin: string): string =>
    `https://static.tinkoff.ru/brands/traiding/${isin}x160.png`;

  public getDistinctOperationTypes = (operations: Operation[]) => {
    const operationTypes: OperationTypeWithCommission[] = [
      ...new Set(operations.map((o) => o.operationType)),
    ];

    return {
      operationTypes,
    };
  };

  public getUsedInstruments = async (
    operations: Operation[],
  ): Promise<MarketInstrument[]> => {
    const distinctFigiSet = new Set<string>();
    const manualOperationTypes: OperationTypeWithCommission[] = [
      'Buy',
      'Sell',
      'BuyCard',
    ];

    operations.forEach(({ operationType, figi }: Operation) => {
      const isManual = manualOperationTypes.includes(operationType);
      if (!isManual) {
        return;
      }

      distinctFigiSet.add(figi);
    });

    const distinctInstruments = await Promise.all(
      [...distinctFigiSet].map((figi: string) =>
        this.getInstrumentByFigi(figi),
      ),
    );

    return distinctInstruments.sort((a, b) => sortByKeyASC(a, b, 'ticker'));
  };

  private joinFigiInfo = async (
    operation: Operation,
  ): Promise<Operation & { tickerInfo: MarketInstrument }> => {
    if (!operation || !operation.figi) {
      return {
        ...operation,
        tickerInfo: null,
      };
    }

    return {
      ...operation,
      tickerInfo: await this.getInstrumentByFigi(operation.figi),
    };
  };

  private sevenDaysAgo = (): Date => {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    return date;
  };
}
