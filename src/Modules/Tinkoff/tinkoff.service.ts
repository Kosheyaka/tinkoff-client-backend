import axios, { AxiosInstance } from "axios";
import {
  BrokerAccountType,
  UserAccountsResponse,
  SandboxRegisterResponse,
} from "@tinkoff/invest-openapi-js-sdk";
import { app } from "../../main";
import { PortfolioResponse } from "@tinkoff/invest-openapi-js-sdk/build/domain";

export class TinkoffService {
  constructor() {
    this.api = axios.create({
      baseURL: app.config.tinkoff.apiUrl,
      headers: {
        authorization: `Bearer ${app.config.tinkoff.secretToken}`,
      },
    });
    this.sandboxApi = axios.create({
      baseURL: app.config.tinkoff.apiUrlSandbox,
      headers: {
        authorization: `Bearer ${app.config.tinkoff.sandboxToken}`,
      },
    });
  }

  private api: AxiosInstance;
  private sandboxApi: AxiosInstance;

  public postSandboxRegister = async (brokerAccountType: BrokerAccountType = "Tinkoff"): Promise<SandboxRegisterResponse> => {
    try {
      const { data } = await this.api.post('/sandbox/register', { brokerAccountType });
      return data as SandboxRegisterResponse;
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

  public getPortfolio = async (): Promise<PortfolioResponse> => {
    try {
      const { data } = await this.api.get('/portfolio');
      return data as PortfolioResponse;
    } catch (e) {
      console.error(e.message);
    }
  };
}
