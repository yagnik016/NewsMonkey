import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveBlog, LiveBlogSchema } from './live-blog.schema';
import { LiveBlogsService } from './live-blogs.service';
import { LiveBlogsController } from './live-blogs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: LiveBlog.name, schema: LiveBlogSchema }])],
  providers: [LiveBlogsService],
  controllers: [LiveBlogsController],
  exports: [LiveBlogsService],
})
export class LiveBlogsModule {} 