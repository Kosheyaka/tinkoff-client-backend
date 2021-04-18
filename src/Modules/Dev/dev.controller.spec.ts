import { Test, TestingModule } from '@nestjs/testing';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';
import { UtilsModule } from '../../Utils/utils.module';

describe('TestController', () => {
  let appController: DevController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      controllers: [DevController],
      providers: [DevService],
    }).compile();

    appController = app.get<DevController>(DevController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
