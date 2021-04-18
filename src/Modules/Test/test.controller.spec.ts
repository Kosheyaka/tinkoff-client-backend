import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { UtilsModule } from '../../Utils/utils.module';

describe('TestController', () => {
  let appController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    appController = app.get<TestController>(TestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
