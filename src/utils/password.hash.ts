import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function passwordHash(payload: string): Promise<string> {
  const saltRounds = 10;
  const password = payload;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function isMatch(payload, hashed) {
  const check = await bcrypt.compare(payload, hashed);
  if (!check)
    throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
  return check;
}
