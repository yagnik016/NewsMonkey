import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PollsService } from './polls.service';
import { Poll } from './polls.schema';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  async getAllPolls(@Query('category') category?: string): Promise<Poll[]> {
    if (category) {
      return this.pollsService.findByCategory(category);
    }
    return this.pollsService.findAll();
  }

  @Get('active')
  async getActivePolls(): Promise<Poll[]> {
    return this.pollsService.findActive();
  }

  @Get('daily')
  async getDailyPoll(): Promise<Poll[]> {
    return this.pollsService.findDaily();
  }

  @Get('featured')
  async getFeaturedPolls(): Promise<Poll[]> {
    return this.pollsService.findFeatured();
  }

  @Get('categories')
  async getCategories(): Promise<string[]> {
    const allPolls = await this.pollsService.findAll();
    const categories = [...new Set(allPolls.map(poll => poll.category))];
    return categories;
  }

  @Get(':id')
  async getPollById(@Param('id') id: string): Promise<Poll> {
    return this.pollsService.findById(id);
  }

  @Get(':id/results')
  async getPollResults(@Param('id') id: string): Promise<{
    poll: Poll;
    percentages: number[];
  }> {
    return this.pollsService.getPollResults(id);
  }

  @Post()
  async createPoll(@Body() pollData: Partial<Poll>): Promise<Poll> {
    return this.pollsService.create(pollData);
  }

  @Post(':id/vote')
  async voteOnPoll(
    @Param('id') id: string,
    @Body() voteData: { optionIndex: number; userId: string }
  ): Promise<Poll> {
    return this.pollsService.vote(id, voteData.optionIndex, voteData.userId);
  }

  @Put(':id')
  async updatePoll(@Param('id') id: string, @Body() pollData: Partial<Poll>): Promise<Poll> {
    return this.pollsService.update(id, pollData);
  }

  @Delete(':id')
  async deletePoll(@Param('id') id: string): Promise<Poll> {
    return this.pollsService.delete(id);
  }

  @Post('seed')
  async seedDemoData(): Promise<{ message: string }> {
    await this.pollsService.seedDemoData();
    return { message: 'Demo data seeded successfully' };
  }
} 