import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffApi } from "./api/tinkoff.api";
import { TinkoffSandboxApi } from "./api/tinkoffSandbox.api";
import { TinkoffService } from "./tinkoff.service";

@Module({
  imports: [],
  controllers: [TinkoffController],
  providers: [
    TinkoffService,
    TinkoffApi,
    TinkoffSandboxApi
  ],
})
export class TinkoffModule {}
