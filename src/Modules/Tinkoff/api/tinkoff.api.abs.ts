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
    const { data } = await this.api.get('/portfolio', brokerAccountId ? { params: { brokerAccountId }} : null);
    return data as PortfolioResponse;
  };

  public portfolioCurrencies = async (brokerAccountId?: string): Promise<PortfolioCurrenciesResponse> => {
    const { data } = await this.api.get('/portfolio/currencies', brokerAccountId ? { params: { brokerAccountId }} : null);
    return data as PortfolioCurrenciesResponse;
  };

  // Market: Получении информации по бумагам

  public marketStocks = async (): Promise<MarketInstrumentListResponse> => {
    const { data } = await this.api.get('/market/stocks');
    return data as MarketInstrumentListResponse;
  };

  public marketCandles = async (params: MarketCandlesParams): Promise<CandlesResponse> => {
    const { data } = await this.api.get('/market/candles', { params });
    return data as CandlesResponse;
  };

  public marketSearchByFigi = async (figi: string): Promise<MarketInstrumentListResponse> => {
    const { data } = await this.api.get('/market/search/by-figi', {
      params: {
        figi: figi.toUpperCase(),
      }
    });
    return data as MarketInstrumentListResponse;
  };

  public marketSearchByTicker = async (ticker: string): Promise<MarketInstrumentListResponse> => {
    const { data } = await this.api.get('/market/search/by-ticker', {
      params: {
        ticker: ticker.toUpperCase(),
      }
    });
    return data as MarketInstrumentListResponse;
  };

  // Operations: Получение информации по операциям

  public operations = async (params: OperationsParams): Promise<OperationsResponse> => {
    const { data } = await this.api.get('/operations', { params });
    return data as OperationsResponse;
  };

  // User: Получение информации по брокерским счетам

  public userAccounts = async (): Promise<UserAccountsResponse> => {
    const { data } = await this.api.get('/user/accounts');
    return data as UserAccountsResponse;
  };
}

