import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LiveScoreDocument = LiveScore & Document;

@Schema({ timestamps: true })
export class LiveScore {
  @Prop({ required: true })
  matchId: string;

  @Prop({ required: true })
  sport: string;

  @Prop({ type: [String], required: true })
  teams: string[];

  @Prop({ default: 'upcoming' })
  status: 'upcoming' | 'live' | 'completed';

  @Prop({ type: Object, default: {} })
  score: Record<string, string>;

  @Prop({ default: '' })
  currentInning: string;

  @Prop({ type: Date })
  lastUpdate: Date;

  @Prop({ type: [Object], default: [] })
  events: Array<{
    over?: string;
    desc: string;
    timestamp?: Date;
  }>;
}

export const LiveScoreSchema = SchemaFactory.createForClass(LiveScore); 