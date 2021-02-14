import { Module } from '@nestjs/common';
import { AppModule } from "./Modules/App/app.module";

@Module({
  imports: [
    AppModule
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
