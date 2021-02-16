import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { INestApplication } from "@nestjs/common";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { MainConfig } from "./main.config";

class App {
  public config: MainConfig;

  private nestInstance: INestApplication;

  public init = async () => {
    await this.loadConfig();
    await this.loadNest();
  };

  private loadNest = async (): Promise<void> => {
    this.nestInstance = await NestFactory.create(MainModule);
    this.nestInstance.enableCors();
    await this.nestInstance.listen(3000);
  };

  private loadConfig = async (): Promise<void> => {
    const file = readFileSync('./config.yml', 'utf8');
    this.config = parse(file);
    // TODO Add config validation
  };
}

export const app = new App;
app.init();
