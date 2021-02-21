import axios, { AxiosInstance } from "axios";
import { app } from "../../../main";
import { UserAccountsResponse } from "@tinkoff/invest-openapi-js-sdk";
import {
  CandlesResponse,
  MarketInstrumentListResponse,
  OperationsResponse,
  PortfolioCurrenciesResponse,
  PortfolioResponse
} from "@tinkoff/invest-openapi-js-sdk/build/domain";

const MarketCandlesIntervals = [
  '1min',
  '2min',
  '3min',
  '5min',
  '10min',
  '15min',
  '30min',
  'hour',
  'day',
  'week',
  'month',
] as const;
type MarketCandlesIntervalType = typeof MarketCandlesIntervals[number];

interface MarketCandlesParams {
  figi: string;
  from: string;
  to: string;
  interval: MarketCandlesIntervalType,
}

interface OperationsParams {
  from: string,
  to: string,
  figi?: string,
  brokerAccountId?: string,
}

export abstract class TinkoffApiAbstract {

  protected api: AxiosInstance;

  protected getAxiosInstance = (isSandbox: boolean): AxiosInstance => {
    const baseURL = isSandbox ? app.config.tinkoff.apiUrlSandbox : app.config.tinkoff.apiUrl;
    const token = isSandbox ? app.config.tinkoff.sandboxToken : app.config.tinkoff.secretToken;
    return axios.create({
      baseURL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  // Portfolio: Операции с портфелем пользователя

  public portfolio = async (brokerAccountId?: string): Promise<PortfolioResponse> => {
    try {
      const { data } = await this.api.get('/portfolio', brokerAccountId ? { params: { brokerAccountId }} : null);
      return data as PortfolioResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  public portfolioCurrencies = async (brokerAccountId?: string): Promise<PortfolioCurrenciesResponse> => {
    try {
      const { data } = await this.api.get('/portfolio/currencies', brokerAccountId ? { params: { brokerAccountId }} : null);
      return data as PortfolioCurrenciesResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  // Market: Получении информации по бумагам

  public marketCandles = async (params: MarketCandlesParams): Promise<CandlesResponse> => {
    try {
      const { data } = await this.api.get('/market/candles', { params });
      return data as CandlesResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  public marketSearchByFigi = async (figi: string): Promise<MarketInstrumentListResponse> => {
    try {
      const { data } = await this.api.get('/market/search/by-figi', {
        params: {
          figi: figi.toUpperCase(),
        }
      });
      return data as MarketInstrumentListResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  public marketSearchByTicker = async (ticker: string): Promise<MarketInstrumentListResponse> => {
    try {
      const { data } = await this.api.get('/market/search/by-ticker', {
        params: {
          ticker: ticker.toUpperCase(),
        }
      });
      return data as MarketInstrumentListResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  // Operations: Получение информации по операциям

  public operations = async (params: OperationsParams): Promise<OperationsResponse> => {
    try {
      const { data } = await this.api.get('/operations', { params });
      return data as OperationsResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  // User: Получение информации по брокерским счетам

  public userAccounts = async (): Promise<UserAccountsResponse> => {
    try {
      const { data } = await this.api.get('/user/accounts');
      return data as UserAccountsResponse;
    } catch (e) {
      console.error(e.message);
    }
  };
}
