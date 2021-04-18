import { Module } from '@nestjs/common';
import { DevModule } from './Modules/Dev/dev.module';
import { TinkoffModule } from './Modules/Tinkoff/tinkoff.module';
import { UtilsModule } from './Utils/utils.module';

const prodModules = [TinkoffModule, UtilsModule];
const devModules = [...prodModules, DevModule];

@Module({
  imports: process.env.NODE_ENV === 'prod' ? prodModules : devModules,
  controllers: [],
  providers: [],
})
export class MainModule {}
