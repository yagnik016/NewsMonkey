import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { Leaderboard } from './leaderboard.schema';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async getAllLeaderboard(@Query('limit') limit?: string): Promise<Leaderboard[]> {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.leaderboardService.findTopUsers(limitNum);
  }

  @Get('top')
  async getTopUsers(@Query('limit') limit?: string): Promise<Leaderboard[]> {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.leaderboardService.findTopUsers(limitNum);
  }

  @Get('stats')
  async getLeaderboardStats(): Promise<{
    totalUsers: number;
    totalPoints: number;
    averagePoints: number;
    topUser: Leaderboard;
  }> {
    return this.leaderboardService.getLeaderboardStats();
  }

  @Get('user/:userId')
  async getUserStats(@Param('userId') userId: string): Promise<Leaderboard> {
    return this.leaderboardService.findByUserId(userId);
  }

  @Get('user/:userId/rank')
  async getUserRank(@Param('userId') userId: string): Promise<{ rank: number }> {
    const rank = await this.leaderboardService.findUserRank(userId);
    return { rank };
  }

  @Post()
  async createUser(@Body() userData: Partial<Leaderboard>): Promise<Leaderboard> {
    return this.leaderboardService.create(userData);
  }

  @Put('user/:userId')
  async updateUser(@Param('userId') userId: string, @Body() userData: Partial<Leaderboard>): Promise<Leaderboard> {
    return this.leaderboardService.update(userId, userData);
  }

  @Post('user/:userId/points')
  async addPoints(
    @Param('userId') userId: string,
    @Body() data: { points: number }
  ): Promise<Leaderboard> {
    return this.leaderboardService.addPoints(userId, data.points);
  }

  @Post('user/:userId/achievement')
  async addAchievement(
    @Param('userId') userId: string,
    @Body() data: { achievement: string }
  ): Promise<Leaderboard> {
    return this.leaderboardService.addAchievement(userId, data.achievement);
  }

  @Post('user/:userId/badge')
  async addBadge(
    @Param('userId') userId: string,
    @Body() data: { badge: string }
  ): Promise<Leaderboard> {
    return this.leaderboardService.addBadge(userId, data.badge);
  }

  @Post('user/:userId/articles-read')
  async incrementArticlesRead(@Param('userId') userId: string): Promise<{ message: string }> {
    await this.leaderboardService.incrementArticlesRead(userId);
    return { message: 'Articles read count updated' };
  }

  @Post('user/:userId/comments-posted')
  async incrementCommentsPosted(@Param('userId') userId: string): Promise<{ message: string }> {
    await this.leaderboardService.incrementCommentsPosted(userId);
    return { message: 'Comments posted count updated' };
  }

  @Post('user/:userId/polls-voted')
  async incrementPollsVoted(@Param('userId') userId: string): Promise<{ message: string }> {
    await this.leaderboardService.incrementPollsVoted(userId);
    return { message: 'Polls voted count updated' };
  }

  @Delete('user/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<Leaderboard> {
    return this.leaderboardService.update(userId, { points: 0, level: 1 });
  }

  @Post('seed')
  async seedDemoData(): Promise<{ message: string }> {
    await this.leaderboardService.seedDemoData();
    return { message: 'Demo data seeded successfully' };
  }
} 