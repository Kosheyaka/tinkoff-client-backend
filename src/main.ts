import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

const validateEnvFiles = () => {};
const bootstrap = async () => {
  const app = await NestFactory.create(MainModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  await app.listen(3000);
};

validateEnvFiles();
bootstrap();
