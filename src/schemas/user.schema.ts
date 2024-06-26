import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
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
  @Prop()
  hashedPassword: string;
  @Prop({ default: 'active' })
  status: string;
}

export const userSchmea = SchemaFactory.createForClass(User);
