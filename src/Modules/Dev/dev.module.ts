import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';
import { UtilsModule } from '../../Utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [DevController],
  providers: [DevService],
})
export class DevModule {}
