import { TinkoffApiAbstract } from "./tinkoff.api.abs";
import { BrokerAccountType, SandboxRegisterResponse } from "@tinkoff/invest-openapi-js-sdk";

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
}
