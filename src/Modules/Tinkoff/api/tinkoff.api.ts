import { TinkoffApiAbstract } from "./tinkoff.api.abs";

export class TinkoffApi extends TinkoffApiAbstract {
  constructor() {
    super();
    this.api = this.getAxiosInstance(false);
  }
}
