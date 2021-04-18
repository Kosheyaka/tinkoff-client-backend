import { Module } from '@nestjs/common';
import { TestModule } from './Modules/Test/test.module';
import { TinkoffModule } from './Modules/Tinkoff/tinkoff.module';
import { UtilsModule } from './Utils/utils.module';

const prodModules = [TinkoffModule, UtilsModule];
const devModules = [...prodModules, TestModule];

@Module({
  imports: process.env.NODE_ENV === 'prod' ? prodModules : devModules,
  controllers: [],
  providers: [],
})
export class MainModule {}
