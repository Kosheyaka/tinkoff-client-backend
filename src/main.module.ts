import { Module } from '@nestjs/common';
import { TestModule } from "./Modules/Test/test.module";
import { TinkoffModule } from "./Modules/Tinkoff/tinkoff.module";

@Module({
  imports: [
    TestModule,
    TinkoffModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
