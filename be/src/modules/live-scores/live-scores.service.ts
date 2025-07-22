import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LiveScore, LiveScoreDocument } from './live-score.schema';
import fetch from 'node-fetch';
import { EXTERNAL_API_BASE_URL } from '../../config/apiConfig';
const Parser = require('rss-parser');

const CRICAPI_KEY = process.env.CRICAPI_KEY || 'd34033b1-9984-4f04-9a79-8f566e42e4ca';
const ESPN_RSS_FEED_URL = 'http://static.espncricinfo.com/rss/livescores.xml';

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

  // Fetch live cricket matches from CricAPI
  async getCricAPILiveMatches(): Promise<any> {
    const url = `${EXTERNAL_API_BASE_URL}matches?apikey=${CRICAPI_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch CricAPI data');
    const data = await res.json();
    return data;
  }

  // Fetch a specific match score from CricAPI
  async getCricAPIMatchScore(uniqueId: string): Promise<any> {
    const url = `${EXTERNAL_API_BASE_URL}cricketScore?apikey=${CRICAPI_KEY}&unique_id=${uniqueId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch CricAPI match score');
    const data = await res.json();
    return data;
  }

  // Fetch and parse ESPN CricInfo live scores RSS feed
  async getEspnLiveScores(): Promise<any> {
    const parser = new Parser();
    const feed = await parser.parseURL(ESPN_RSS_FEED_URL);
    return feed.items;
  }
} 