import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(payload: LoginDto) {
    const { email, password } = payload;

    const isUserExist = await this.prisma.user.findUnique({ where: { email } });

    if (!isUserExist) throw new NotFoundException('User not found!');

    if (isUserExist.password !== password)
      throw new UnauthorizedException('Password did not match!');

    const jwtPayload = {
      id: isUserExist.id,
      email: isUserExist.email,
      name: isUserExist.name,
    };

    const token = jwt.sign(jwtPayload, 'arif@210505', { expiresIn: '1h' });

    return token;
  }
}
