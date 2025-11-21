import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    super({ adapter: pool });
  }
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma client connected successfully');
    } catch (error) {
      console.log('Failed to connect prisma', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma client disconnected successfully');
  }
}
