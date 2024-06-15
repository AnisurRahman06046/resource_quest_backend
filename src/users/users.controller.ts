import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/middlewares/auth.guard';

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
      status: HttpStatus.OK,
      message: 'user is logged in',
      data: result,
    };
  }

  // all users
  @Get('all-users')
  async allUsers() {
    const result = await this.userService.allUsers();
    return {
      status: HttpStatus.OK,
      message: 'All Users are fetched',
      data: result,
    };
  }

  // single user
  @Get('user')
  @UseGuards(AuthGuard)
  async singleUser(@Request() req) {
    // console.log(req.user.sub);
    const result = await this.userService.singleUser(req.user.sub);
    return {
      status: HttpStatus.OK,
      message: 'User is fetched',
      data: result,
    };
  }
}
