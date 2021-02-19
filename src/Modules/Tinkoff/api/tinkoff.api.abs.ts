import axios, { AxiosInstance } from "axios";
import { app } from "../../../main";
import { UserAccountsResponse } from "@tinkoff/invest-openapi-js-sdk";
import {
  MarketInstrumentListResponse,
  OperationsResponse,
  PortfolioCurrenciesResponse,
  PortfolioResponse,
} from "@tinkoff/invest-openapi-js-sdk/build/domain";

interface GetOperationsParams {
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

  public getPortfolio = async (brokerAccountId?: string): Promise<PortfolioResponse> => {
    try {
      const { data } = await this.api.get('/portfolio', brokerAccountId ? { params: { brokerAccountId }} : null);
      return data as PortfolioResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  public getPortfolioCurrencies = async (brokerAccountId?: string): Promise<PortfolioCurrenciesResponse> => {
    try {
      const { data } = await this.api.get('/portfolio/currencies', brokerAccountId ? { params: { brokerAccountId }} : null);
      return data as PortfolioCurrenciesResponse;
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

  public getOperations = async (params: GetOperationsParams): Promise<OperationsResponse> => {
    try {
      const { data } = await this.api.get('/operations', { params });
      return data as OperationsResponse;
    } catch (e) {
      console.error(e.message);
    }
  };

  public getUserAccounts = async (): Promise<UserAccountsResponse> => {
    try {
      const { data } = await this.api.get('/user/accounts');
      return data as UserAccountsResponse;
    } catch (e) {
      console.error(e.message);
    }
  };
}
