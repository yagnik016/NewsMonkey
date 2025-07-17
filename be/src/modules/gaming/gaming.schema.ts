import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GamingDocument = Gaming & Document;

@Schema({ timestamps: true })
export class Gaming {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  imageUrl?: string;

  @Prop({ required: true })
  category: string; // 'news', 'review', 'release', 'esports'

  @Prop()
  gameTitle?: string;

  @Prop()
  rating?: number;

  @Prop()
  author: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  tags?: string[];

  @Prop()
  externalUrl?: string;
}

export const GamingSchema = SchemaFactory.createForClass(Gaming); 