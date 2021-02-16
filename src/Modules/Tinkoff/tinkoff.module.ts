import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffApi } from "./tinkoffApi";

@Module({
  imports: [],
  controllers: [TinkoffController],
  providers: [TinkoffApi],
})
export class TinkoffModule {}
