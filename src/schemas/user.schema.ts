import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserSchema {
  @Prop({ required: [true, 'First name is required'] })
  firstName: string;
  @Prop({ required: [true, 'Last name is required'] })
  lastName: string;
  @Prop({ required: [true, 'User name is required'], unique: true })
  userName: string;
  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;
  @Prop({ required: [true, 'password is required'] })
  password: string;
  @Prop({ default: 'active' })
  status: string;
}
