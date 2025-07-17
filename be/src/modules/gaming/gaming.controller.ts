import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { GamingService } from './gaming.service';
import { Gaming } from './gaming.schema';

@Controller('gaming')
export class GamingController {
  constructor(private readonly gamingService: GamingService) {}

  @Get()
  async getAllGaming(@Query('category') category?: string): Promise<Gaming[]> {
    if (category) {
      return this.gamingService.findByCategory(category);
    }
    return this.gamingService.findAll();
  }

  @Get('featured')
  async getFeatured(): Promise<Gaming[]> {
    return this.gamingService.findFeatured();
  }

  @Get('trending')
  async getTrending(): Promise<Gaming[]> {
    return this.gamingService.findTrending();
  }

  @Get('categories')
  async getCategories(): Promise<string[]> {
    const allGaming = await this.gamingService.findAll();
    const categories = [...new Set(allGaming.map(item => item.category))];
    return categories;
  }

  @Get(':id')
  async getGamingById(@Param('id') id: string): Promise<Gaming> {
    await this.gamingService.incrementViews(id);
    return this.gamingService.findById(id);
  }

  @Post()
  async createGaming(@Body() gamingData: Partial<Gaming>): Promise<Gaming> {
    return this.gamingService.create(gamingData);
  }

  @Put(':id')
  async updateGaming(@Param('id') id: string, @Body() gamingData: Partial<Gaming>): Promise<Gaming> {
    return this.gamingService.update(id, gamingData);
  }

  @Delete(':id')
  async deleteGaming(@Param('id') id: string): Promise<Gaming> {
    return this.gamingService.delete(id);
  }

  @Post(':id/like')
  async likeGaming(@Param('id') id: string): Promise<{ message: string }> {
    await this.gamingService.incrementLikes(id);
    return { message: 'Liked successfully' };
  }

  @Post('seed')
  async seedDemoData(): Promise<{ message: string }> {
    await this.gamingService.seedDemoData();
    return { message: 'Demo data seeded successfully' };
  }
} 