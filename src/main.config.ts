import { TinkoffConfig } from "./Modules/Tinkoff/tinkoff.config";
import { IsObject } from "class-validator";

export class MainConfig {
  @IsObject()
  tinkoff: TinkoffConfig;
}
