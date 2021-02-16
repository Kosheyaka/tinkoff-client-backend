import axios, { AxiosInstance } from "axios";
import { app } from "../../../main";

export abstract class TinkoffApiAbstract {

  protected api: AxiosInstance;

  protected getAxiosInstance = (sandbox: boolean = false): AxiosInstance => {
    const baseURL = sandbox ? app.config.tinkoff.apiUrlSandbox : app.config.tinkoff.apiUrl;
    const token = sandbox ? app.config.tinkoff.sandboxToken : app.config.tinkoff.secretToken;
    return axios.create({
      baseURL,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
}
