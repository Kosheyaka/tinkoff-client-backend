import { Module } from '@nestjs/common';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffApi } from './api/tinkoff.api';
import { TinkoffSandboxApi } from './api/tinkoffSandbox.api';
import { TinkoffService } from './tinkoff.service';
import { UtilsModule } from '../../Utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [TinkoffController],
  providers: [TinkoffService, TinkoffApi, TinkoffSandboxApi],
})
export class TinkoffModule {}
