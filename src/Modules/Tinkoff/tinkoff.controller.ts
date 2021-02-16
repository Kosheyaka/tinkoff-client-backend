import { Controller, Post } from "@nestjs/common";
import { SandboxRegisterRequest, SandboxRegisterResponse } from "@tinkoff/invest-openapi-js-sdk/";
import axios, { AxiosRequestConfig } from "axios";
import { app } from "../../main";

@Controller('tinkoff')
export class TinkoffController {

  private axiosConfig: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${app.config.tinkoff.sandboxToken}`,
    }
  };

  @Post('registerSandbox')
  async registerSandbox() {
    const { apiUrlSandbox } = app.config.tinkoff;

    const body: SandboxRegisterRequest = {
      brokerAccountType: "Tinkoff",
    };

    let data: SandboxRegisterResponse = null;
    try {
      const response = await axios.post(apiUrlSandbox + 'sandbox/register', body, this.axiosConfig);
      data = response.data;
    } catch (e) {
      console.error(e.message);
    }

    return data;
  }
}
