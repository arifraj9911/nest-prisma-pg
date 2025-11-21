import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: UserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAll() {
    return await this.userService.getUser();
  }
}
