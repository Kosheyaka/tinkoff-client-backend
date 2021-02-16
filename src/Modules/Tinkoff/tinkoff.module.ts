import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';

@Module({
  imports: [],
  controllers: [TinkoffController],
  providers: [],
})
export class TinkoffModule {}
