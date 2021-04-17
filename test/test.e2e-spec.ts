import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../src/main.module';

describe('TestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test/hello (GET)', async (done) => {
    await request(app.getHttpServer())
      .get('/test/hello')
      .expect(200)
      .expect('Hello World!');
    done();
  });

  afterEach(async () => {
    // await app.close();
  });

  it('/test/cache (GET)', async (done) => {
    await request(app.getHttpServer())
      .get('/test/cache?a=1')
      .expect(200)
      .expect(JSON.stringify({ a: '1' }));
    done();
  });
});
