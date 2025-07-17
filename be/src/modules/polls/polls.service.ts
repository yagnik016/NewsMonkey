import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poll, PollDocument } from './polls.schema';

@Injectable()
export class PollsService {
  constructor(
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
  ) {}

  async findAll(): Promise<Poll[]> {
    return this.pollModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findActive(): Promise<Poll[]> {
    return this.pollModel.find({ isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findByCategory(category: string): Promise<Poll[]> {
    return this.pollModel.find({ category, isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findDaily(): Promise<Poll[]> {
    return this.pollModel.find({ category: 'daily', isActive: true }).sort({ createdAt: -1 }).limit(1).exec();
  }

  async findFeatured(): Promise<Poll[]> {
    return this.pollModel.find({ category: 'featured', isActive: true }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Poll> {
    return this.pollModel.findById(id).exec();
  }

  async create(pollData: Partial<Poll>): Promise<Poll> {
    const poll = new this.pollModel(pollData);
    return poll.save();
  }

  async update(id: string, pollData: Partial<Poll>): Promise<Poll> {
    return this.pollModel.findByIdAndUpdate(id, pollData, { new: true }).exec();
  }

  async delete(id: string): Promise<Poll> {
    return this.pollModel.findByIdAndDelete(id).exec();
  }

  async vote(pollId: string, optionIndex: number, userId: string): Promise<Poll> {
    const poll = await this.pollModel.findById(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    if (poll.votes.includes(userId)) {
      throw new Error('User has already voted');
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      throw new Error('Invalid option index');
    }

    // Initialize results array if it doesn't exist
    if (!poll.results || poll.results.length === 0) {
      poll.results = new Array(poll.options.length).fill(0);
    }

    // Add vote
    poll.votes.push(userId);
    poll.results[optionIndex]++;
    poll.totalVotes++;

    return poll.save();
  }

  async getPollResults(pollId: string): Promise<{
    poll: Poll;
    percentages: number[];
  }> {
    const poll = await this.pollModel.findById(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    const percentages = poll.results.map(result => 
      poll.totalVotes > 0 ? (result / poll.totalVotes) * 100 : 0
    );

    return {
      poll,
      percentages,
    };
  }

  // Seed demo data
  async seedDemoData(): Promise<void> {
    const demoData = [
      {
        question: 'Which premium feature excites you most?',
        options: ['Gaming', 'Finance & Crypto', 'Video Highlights', 'Podcasts'],
        category: 'daily',
        isActive: true,
        author: 'NewsMonkey Team',
        results: [45, 25, 20, 10],
        totalVotes: 100,
        tags: ['premium', 'features']
      },
      {
        question: 'Who won Game of the Year 2024?',
        options: ['Elden Ring', 'GTA VI', 'FIFA 25', 'Cyberpunk 2077'],
        category: 'featured',
        isActive: true,
        author: 'Gaming Team',
        results: [60, 20, 15, 5],
        totalVotes: 150,
        tags: ['gaming', 'awards']
      },
      {
        question: 'What\'s your preferred news format?',
        options: ['Articles', 'Videos', 'Podcasts', 'Live Blogs'],
        category: 'weekly',
        isActive: true,
        author: 'Content Team',
        results: [40, 35, 15, 10],
        totalVotes: 200,
        tags: ['content', 'preferences']
      }
    ];

    for (const data of demoData) {
      const existing = await this.pollModel.findOne({ question: data.question });
      if (!existing) {
        await this.create(data);
      }
    }
  }
} 