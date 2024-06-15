import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //   register user
  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    console.log(payload);
    const result = await this.userService.register(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'Todo is added',
      data: result,
    };
  }

  // login
  @Post('login')
  async login(@Body() payload: { email: string; password: string }) {
    const result = await this.userService.login(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'user is logged in',
      data: result,
    };
  }
}
