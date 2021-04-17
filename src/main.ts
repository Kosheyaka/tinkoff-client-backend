import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { MainConfig } from "./main.config";

class App {
  public config: MainConfig;

  private nestInstance: INestApplication;

  public logger: Logger;

  public init = async () => {
    await this.loadConfig();
    await this.loadLogger();
    await this.loadNest();
  };

  private loadConfig = async (): Promise<void> => {
    const file = readFileSync('./config.yml', 'utf8');
    this.config = parse(file);
    // TODO Add config validation
  };

  private loadLogger = async (): Promise<void> => {
    this.logger = new Logger();
  };

  private loadNest = async (): Promise<void> => {
    this.nestInstance = await NestFactory.create(MainModule);
    this.nestInstance.enableCors();
    this.nestInstance.useGlobalPipes(new ValidationPipe({ transform: true }));
    await this.nestInstance.listen(3000);
  };
}

export const app = new App();
app.init();
