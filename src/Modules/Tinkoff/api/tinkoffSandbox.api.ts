import {
  BrokerAccountType,
  UserAccountsResponse,
  SandboxRegisterResponse,
} from "@tinkoff/invest-openapi-js-sdk";
import { PortfolioResponse } from "@tinkoff/invest-openapi-js-sdk/build/domain";
import { TinkoffApiAbstract } from "./tinkoff.api.abs";

export class TinkoffSandboxApi extends TinkoffApiAbstract {
  constructor() {
    super();
    this.api = this.getAxiosInstance(true);
  }

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
