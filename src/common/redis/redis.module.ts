import { Global, Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
