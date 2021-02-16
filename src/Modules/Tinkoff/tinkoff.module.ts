import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffService } from "./tinkoff.service";

@Module({
  imports: [],
  controllers: [TinkoffController],
  providers: [TinkoffService],
})
export class TinkoffModule {}
