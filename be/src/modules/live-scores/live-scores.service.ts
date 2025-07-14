import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveScore, LiveScoreDocument } from './live-score.schema';

@Injectable()
export class LiveScoresService {
  constructor(
    @InjectModel(LiveScore.name) private liveScoreModel: Model<LiveScoreDocument>,
  ) {}

  async createOrUpdateScore(data: Partial<LiveScore>): Promise<LiveScore> {
    return this.liveScoreModel.findOneAndUpdate(
      { matchId: data.matchId },
      { $set: data, lastUpdate: new Date() },
      { upsert: true, new: true }
    ).exec();
  }

  async getAllLiveScores(): Promise<LiveScore[]> {
    return this.liveScoreModel.find({}).sort({ lastUpdate: -1 }).exec();
  }

  async getLiveScoreById(id: string): Promise<LiveScore> {
    const score = await this.liveScoreModel.findById(id).exec();
    if (!score) throw new NotFoundException('Live score not found');
    return score;
  }
} 