/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found from auth guard');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Password not match from auth guard');
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const jwtPayload: JwtPayload = payload;

    const token = this.jwtService.sign(jwtPayload);

    return { access_token: token };
  }
}
