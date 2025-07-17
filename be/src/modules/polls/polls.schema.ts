import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PollDocument = Poll & Document;

@Schema({ timestamps: true })
export class Poll {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true, type: [String] })
  options: string[];

  @Prop({ type: [String], default: [] })
  votes: string[]; // Array of user IDs who voted

  @Prop({ type: [Number], default: [] })
  results: number[]; // Count of votes for each option

  @Prop({ required: true })
  category: string; // 'daily', 'weekly', 'featured'

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  expiresAt?: Date;

  @Prop({ default: false })
  isMultipleChoice: boolean;

  @Prop()
  author: string;

  @Prop({ default: 0 })
  totalVotes: number;

  @Prop()
  tags?: string[];
}

export const PollSchema = SchemaFactory.createForClass(Poll); 