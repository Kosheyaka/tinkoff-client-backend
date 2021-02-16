import { IsString } from "class-validator";

export class TinkoffConfig {
  @IsString()
  apiUrl: string;

  @IsString()
  apiUrlSandbox: string;

  @IsString()
  socketURL: string;

  @IsString()
  secretToken: string;

  @IsString()
  sandboxToken: string;
}
