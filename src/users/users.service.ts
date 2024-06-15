import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';
import { isMatch, passwordHash } from 'src/utils/password.hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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

  // login user
  async login(payload: { email: string; password: string }) {
    console.log(payload);
    // check if the user is exist
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user)
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    // check password
    const isPasswordMatched = await isMatch(
      payload.password,
      user.hashedPassword,
    );
    console.log(isPasswordMatched);
    if (!isPasswordMatched)
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

    // generating token
    const tokenPayload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(tokenPayload);
    return { access_token: token };
  }

  // all users
  async allUsers() {
    const users = await this.userModel
      .find({})
      .select('-password -hashedPassword');
    return users;
  }

  // single user
  async singleUser(id: string) {
    // console.log(id);
    const user = await this.userModel
      .findOne({ _id: id })
      .select('-password -hashedPassword');
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
