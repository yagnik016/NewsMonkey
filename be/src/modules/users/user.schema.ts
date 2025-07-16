import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string; // Hashed password

  @Prop({ trim: true })
  name: string;

  @Prop({ type: [String], default: [] })
  interests: string[]; // Array of category slugs
}

export const UserSchema = SchemaFactory.createForClass(User); 