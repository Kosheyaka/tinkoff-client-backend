import { Module } from '@nestjs/common';
import { AppModule } from "./Modules/App/app.module";
import { TinkoffModule } from "./Modules/Tinkoff/tinkoff.module";

@Module({
  imports: [
    AppModule,
    TinkoffModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
