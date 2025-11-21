import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(payload: UserDto) {
    const res = await this.prisma.user.create({ data: payload });
    return {
      message: 'User Created Successfully',
      user: res,
    };
  }

  async getUser() {
    return await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }
}
