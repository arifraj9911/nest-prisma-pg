/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(payload: UserDto) {
    const res = await this.prisma.user.create({ data: payload });
    return {
      message: 'User Created Successfully',
      user: res,
    };
  }

  async getUser() {
    const cacheData = await this.redisService.getCacheValue(
      'user-cache',
      'all',
    );

    if (cacheData) {
      console.log('from redis', cacheData);
      return cacheData;
    }

    const user = await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    await this.redisService.setCache('user-cache', 'all', user, 1555200);

    return user;
  }
}
