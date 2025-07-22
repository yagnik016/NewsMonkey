import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LiveScoresService } from './live-scores.service';

@Controller('live-scores')
export class LiveScoresController {
  constructor(private readonly liveScoresService: LiveScoresService) {}

  @Post()
  createOrUpdate(@Body() data: any) {
    return this.liveScoresService.createOrUpdateScore(data);
  }

  @Get()
  findAll() {
    return this.liveScoresService.getAllLiveScores();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveScoresService.getLiveScoreById(id);
  }

  @Get('cricket/live')
  getCricAPILiveMatches() {
    return this.liveScoresService.getCricAPILiveMatches();
  }

  @Get('cricket/score/:uniqueId')
  getCricAPIMatchScore(@Param('uniqueId') uniqueId: string) {
    return this.liveScoresService.getCricAPIMatchScore(uniqueId);
  }

  @Get('espn/live')
  getEspnLiveScores() {
    return this.liveScoresService.getEspnLiveScores();
  }
} 