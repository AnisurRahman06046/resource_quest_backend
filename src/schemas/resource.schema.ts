import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Resource {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: [true, 'Title is required'] })
  title: string;

  @Prop({ required: [true, 'Link is required'] })
  link: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const resourceSchema = SchemaFactory.createForClass(Resource);
