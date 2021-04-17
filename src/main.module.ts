import { Module } from '@nestjs/common';
import { TestModule } from './Modules/Test/test.module';
import { TinkoffModule } from './Modules/Tinkoff/tinkoff.module';
import { UtilsModule } from './Utils/utils.module';

@Module({
  imports: [TestModule, TinkoffModule, UtilsModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
