import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsDate, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  category: Types.ObjectId | string;

  @IsString()
  @IsOptional()
  status?: 'draft' | 'published' | 'archived';

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  isBreaking?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  isLiveBlog?: boolean;

  @IsDate()
  @IsOptional()
  publishedAt?: Date;

  @IsDate()
  @IsOptional()
  scheduledAt?: Date;

  @IsObject()
  @IsOptional()
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  @IsObject()
  @IsOptional()
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
} 