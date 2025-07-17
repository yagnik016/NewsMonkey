import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FinanceDocument = Finance & Document;

@Schema({ timestamps: true })
export class Finance {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  change: number;

  @Prop({ required: true })
  changePercent: number;

  @Prop({ required: true })
  type: string; // 'stock', 'crypto', 'forex'

  @Prop()
  marketCap?: number;

  @Prop()
  volume?: number;

  @Prop()
  high24h?: number;

  @Prop()
  low24h?: number;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  lastUpdated: Date;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance); 