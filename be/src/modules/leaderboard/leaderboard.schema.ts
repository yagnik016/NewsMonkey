import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaderboardDocument = Leaderboard & Document;

@Schema({ timestamps: true })
export class Leaderboard {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, default: 0 })
  points: number;

  @Prop({ required: true, default: 0 })
  level: number;

  @Prop({ type: [String], default: [] })
  achievements: string[];

  @Prop({ type: [String], default: [] })
  badges: string[];

  @Prop({ default: 0 })
  articlesRead: number;

  @Prop({ default: 0 })
  commentsPosted: number;

  @Prop({ default: 0 })
  pollsVoted: number;

  @Prop({ default: 0 })
  daysActive: number;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop()
  lastActive: Date;

  @Prop()
  rank?: number;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard); 