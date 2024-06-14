import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';
import { passwordHash } from 'src/utils/password.hash';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //   create user
  async register(payload: CreateUserDto) {
    const isUserExist = await this.userModel.findOne({ email: payload.email });
    if (isUserExist)
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    const hashed = await passwordHash(payload.password);
    const newPayload = { ...payload, hashedPassword: hashed };
    const result = await this.userModel.create(newPayload);
    if (!result)
      throw new HttpException(
        'Failed to create user.Contact with service provider',
        HttpStatus.BAD_REQUEST,
      );

    const { password, hashedPassword, ...userWithoutPasswords } =
      result.toObject();

    return userWithoutPasswords;
  }
}
