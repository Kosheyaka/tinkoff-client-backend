import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { UtilsModule } from '../../Utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
