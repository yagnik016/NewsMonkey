import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LiveBlogDocument = LiveBlog & Document;

@Schema({ timestamps: true })
export class LiveBlog {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true })
  eventSlug: string;

  @Prop({ type: [Object], default: [] })
  entries: Array<{
    timestamp: Date;
    content: string;
    author?: string;
    image?: string;
  }>;

  @Prop({ default: true })
  isActive: boolean;
}

export const LiveBlogSchema = SchemaFactory.createForClass(LiveBlog); 