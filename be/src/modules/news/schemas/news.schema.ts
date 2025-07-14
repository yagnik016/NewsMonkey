import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ trim: true })
  summary: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ default: 'published' })
  status: 'draft' | 'published' | 'archived';

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  shares: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: false })
  isBreaking: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: false })
  isLiveBlog: boolean;

  @Prop({ default: 'local' })
  source: string;

  @Prop({ trim: true })
  externalUrl: string;

  @Prop({ type: Date })
  publishedAt: Date;

  @Prop({ type: Date })
  scheduledAt: Date;

  @Prop({ type: Object })
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  @Prop({ type: Object })
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const NewsSchema = SchemaFactory.createForClass(News);

// Indexes for better performance
NewsSchema.index({ title: 'text', content: 'text' });
NewsSchema.index({ category: 1 });
NewsSchema.index({ status: 1 });
NewsSchema.index({ publishedAt: -1 });
NewsSchema.index({ isBreaking: 1 });
NewsSchema.index({ isFeatured: 1 }); 