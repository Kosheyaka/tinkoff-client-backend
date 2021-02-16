import { SandboxRegisterRequest, SandboxRegisterResponse } from "@tinkoff/invest-openapi-js-sdk";
import axios, { AxiosRequestConfig } from "axios";
import { app } from "../../main";

export class TinkoffService {
  private axiosConfig: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${app.config.tinkoff.sandboxToken}`,
    }
  };

  public sandboxRegister = async (): Promise<SandboxRegisterResponse> => {
    const { apiUrlSandbox } = app.config.tinkoff;

    const body: SandboxRegisterRequest = {
      brokerAccountType: "Tinkoff",
    };

    try {
      const { data } = await axios.post(apiUrlSandbox + 'sandbox/register', body, this.axiosConfig);
      return data as SandboxRegisterResponse;
    } catch (e) {
      console.error(e.message);
    }
  };
}
