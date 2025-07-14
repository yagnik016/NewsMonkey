import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LiveBlogsService } from './live-blogs.service';

@Controller('live-blogs')
export class LiveBlogsController {
  constructor(private readonly liveBlogsService: LiveBlogsService) {}

  @Post()
  create(@Body() data: any) {
    return this.liveBlogsService.createLiveBlog(data);
  }

  @Get()
  findAll() {
    return this.liveBlogsService.getAllLiveBlogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveBlogsService.getLiveBlogById(id);
  }

  @Post(':id/entries')
  addEntry(@Param('id') id: string, @Body() entry: any) {
    return this.liveBlogsService.addEntry(id, entry);
  }
} 