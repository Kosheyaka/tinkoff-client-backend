import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffApi } from "./api/tinkoff.api";
import { TinkoffSandboxApi } from "./api/tinkoffSandbox.api";

@Module({
  imports: [],
  controllers: [TinkoffController],
  providers: [TinkoffApi, TinkoffSandboxApi],
})
export class TinkoffModule {}
