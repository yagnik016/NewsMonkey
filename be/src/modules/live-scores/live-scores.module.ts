import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveScore, LiveScoreSchema } from './live-score.schema';
import { LiveScoresService } from './live-scores.service';
import { LiveScoresController } from './live-scores.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: LiveScore.name, schema: LiveScoreSchema }])],
  providers: [LiveScoresService],
  controllers: [LiveScoresController],
  exports: [LiveScoresService],
})
export class LiveScoresModule {} 