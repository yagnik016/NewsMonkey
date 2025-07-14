import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveBlog, LiveBlogDocument } from './live-blog.schema';

@Injectable()
export class LiveBlogsService {
  constructor(
    @InjectModel(LiveBlog.name) private liveBlogModel: Model<LiveBlogDocument>,
  ) {}

  async createLiveBlog(data: Partial<LiveBlog>): Promise<LiveBlog> {
    return this.liveBlogModel.create(data);
  }

  async getAllLiveBlogs(): Promise<LiveBlog[]> {
    return this.liveBlogModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async getLiveBlogById(id: string): Promise<LiveBlog> {
    const blog = await this.liveBlogModel.findById(id).exec();
    if (!blog) throw new NotFoundException('Live blog not found');
    return blog;
  }

  async addEntry(id: string, entry: { content: string; author?: string; image?: string }): Promise<LiveBlog> {
    const blog = await this.liveBlogModel.findById(id).exec();
    if (!blog) throw new NotFoundException('Live blog not found');
    blog.entries.push({ ...entry, timestamp: new Date() });
    await blog.save();
    return blog;
  }
} 