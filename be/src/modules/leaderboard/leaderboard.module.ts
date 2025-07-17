import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { Leaderboard, LeaderboardSchema } from './leaderboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Leaderboard.name, schema: LeaderboardSchema }]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {} 