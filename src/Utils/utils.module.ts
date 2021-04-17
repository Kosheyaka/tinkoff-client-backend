import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [],
  providers: [CacheService],
})
export class UtilsModule {}
