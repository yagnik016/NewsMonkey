import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leaderboard, LeaderboardDocument } from './leaderboard.schema';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Leaderboard.name) private leaderboardModel: Model<LeaderboardDocument>,
  ) {}

  async findAll(): Promise<Leaderboard[]> {
    return this.leaderboardModel.find().sort({ points: -1 }).exec();
  }

  async findTopUsers(limit: number = 10): Promise<Leaderboard[]> {
    return this.leaderboardModel.find().sort({ points: -1 }).limit(limit).exec();
  }

  async findByUserId(userId: string): Promise<Leaderboard> {
    return this.leaderboardModel.findOne({ userId }).exec();
  }

  async findUserRank(userId: string): Promise<number> {
    const user = await this.leaderboardModel.findOne({ userId });
    if (!user) return -1;

    const usersWithHigherPoints = await this.leaderboardModel.countDocuments({
      points: { $gt: user.points }
    });

    return usersWithHigherPoints + 1;
  }

  async create(userData: Partial<Leaderboard>): Promise<Leaderboard> {
    const leaderboard = new this.leaderboardModel(userData);
    return leaderboard.save();
  }

  async update(userId: string, userData: Partial<Leaderboard>): Promise<Leaderboard> {
    return this.leaderboardModel.findOneAndUpdate({ userId }, userData, { new: true }).exec();
  }

  async addPoints(userId: string, points: number): Promise<Leaderboard> {
    const user = await this.leaderboardModel.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    user.points += points;
    user.level = Math.floor(user.points / 100) + 1;
    user.lastActive = new Date();

    return user.save();
  }

  async addAchievement(userId: string, achievement: string): Promise<Leaderboard> {
    const user = await this.leaderboardModel.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.achievements.includes(achievement)) {
      user.achievements.push(achievement);
      user.points += 50; // Bonus points for achievement
    }

    return user.save();
  }

  async addBadge(userId: string, badge: string): Promise<Leaderboard> {
    const user = await this.leaderboardModel.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.badges.includes(badge)) {
      user.badges.push(badge);
      user.points += 25; // Bonus points for badge
    }

    return user.save();
  }

  async incrementArticlesRead(userId: string): Promise<void> {
    await this.leaderboardModel.findOneAndUpdate(
      { userId },
      { $inc: { articlesRead: 1, points: 5 } }
    ).exec();
  }

  async incrementCommentsPosted(userId: string): Promise<void> {
    await this.leaderboardModel.findOneAndUpdate(
      { userId },
      { $inc: { commentsPosted: 1, points: 10 } }
    ).exec();
  }

  async incrementPollsVoted(userId: string): Promise<void> {
    await this.leaderboardModel.findOneAndUpdate(
      { userId },
      { $inc: { pollsVoted: 1, points: 15 } }
    ).exec();
  }

  async getLeaderboardStats(): Promise<{
    totalUsers: number;
    totalPoints: number;
    averagePoints: number;
    topUser: Leaderboard;
  }> {
    const totalUsers = await this.leaderboardModel.countDocuments();
    const allUsers = await this.leaderboardModel.find();
    const totalPoints = allUsers.reduce((sum, user) => sum + user.points, 0);
    const averagePoints = totalUsers > 0 ? totalPoints / totalUsers : 0;
    const topUser = await this.leaderboardModel.findOne().sort({ points: -1 });

    return {
      totalUsers,
      totalPoints,
      averagePoints,
      topUser,
    };
  }

  // Seed demo data
  async seedDemoData(): Promise<void> {
    const demoData = [
      {
        userId: 'user1',
        username: 'Alice',
        points: 1200,
        level: 12,
        achievements: ['First Article', 'Comment Master', 'Poll Enthusiast'],
        badges: ['🥇', '🏆', '⭐'],
        articlesRead: 150,
        commentsPosted: 45,
        pollsVoted: 20,
        daysActive: 30,
        isPremium: true,
        lastActive: new Date()
      },
      {
        userId: 'user2',
        username: 'Bob',
        points: 1100,
        level: 11,
        achievements: ['Article Reader', 'Community Member'],
        badges: ['🥈', '🏅'],
        articlesRead: 120,
        commentsPosted: 30,
        pollsVoted: 15,
        daysActive: 25,
        isPremium: false,
        lastActive: new Date()
      },
      {
        userId: 'user3',
        username: 'Charlie',
        points: 950,
        level: 9,
        achievements: ['Newcomer'],
        badges: ['🥉'],
        articlesRead: 80,
        commentsPosted: 20,
        pollsVoted: 10,
        daysActive: 15,
        isPremium: false,
        lastActive: new Date()
      },
      {
        userId: 'user4',
        username: 'Diana',
        points: 900,
        level: 9,
        achievements: ['Active Reader'],
        badges: ['🏅'],
        articlesRead: 75,
        commentsPosted: 15,
        pollsVoted: 8,
        daysActive: 12,
        isPremium: false,
        lastActive: new Date()
      },
      {
        userId: 'user5',
        username: 'Eve',
        points: 850,
        level: 8,
        achievements: ['First Steps'],
        badges: ['🏅'],
        articlesRead: 60,
        commentsPosted: 10,
        pollsVoted: 5,
        daysActive: 8,
        isPremium: false,
        lastActive: new Date()
      }
    ];

    for (const data of demoData) {
      const existing = await this.leaderboardModel.findOne({ userId: data.userId });
      if (!existing) {
        await this.create(data);
      }
    }
  }
} 