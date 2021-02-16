import axios, { AxiosInstance } from "axios";
import { app } from "../../../main";
import { UserAccountsResponse } from "@tinkoff/invest-openapi-js-sdk";
import { PortfolioResponse } from "@tinkoff/invest-openapi-js-sdk/build/domain";

export abstract class TinkoffApiAbstract {

  protected api: AxiosInstance;

  protected getAxiosInstance = (isSandbox: boolean): AxiosInstance => {
    const baseURL = isSandbox ? app.config.tinkoff.apiUrl : app.config.tinkoff.apiUrlSandbox;
    const token = isSandbox ? app.config.tinkoff.secretToken : app.config.tinkoff.sandboxToken;
    return axios.create({
      baseURL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  public getPortfolio = async (): Promise<PortfolioResponse> => {
    try {
      const { data } = await this.api.get('/portfolio');
      return data as PortfolioResponse;
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
