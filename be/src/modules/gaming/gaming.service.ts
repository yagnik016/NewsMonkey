import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gaming, GamingDocument } from './gaming.schema';

@Injectable()
export class GamingService {
  constructor(
    @InjectModel(Gaming.name) private gamingModel: Model<GamingDocument>,
  ) {}

  async findAll(): Promise<Gaming[]> {
    return this.gamingModel.find().sort({ createdAt: -1 }).exec();
  }

  async findFeatured(): Promise<Gaming[]> {
    return this.gamingModel.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(6).exec();
  }

  async findByCategory(category: string): Promise<Gaming[]> {
    return this.gamingModel.find({ category }).sort({ createdAt: -1 }).exec();
  }

  async findTrending(): Promise<Gaming[]> {
    return this.gamingModel.find().sort({ views: -1, likes: -1 }).limit(5).exec();
  }

  async findById(id: string): Promise<Gaming> {
    return this.gamingModel.findById(id).exec();
  }

  async create(gamingData: Partial<Gaming>): Promise<Gaming> {
    const gaming = new this.gamingModel(gamingData);
    return gaming.save();
  }

  async update(id: string, gamingData: Partial<Gaming>): Promise<Gaming> {
    return this.gamingModel.findByIdAndUpdate(id, gamingData, { new: true }).exec();
  }

  async delete(id: string): Promise<Gaming> {
    return this.gamingModel.findByIdAndDelete(id).exec();
  }

  async incrementViews(id: string): Promise<void> {
    await this.gamingModel.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
  }

  async incrementLikes(id: string): Promise<void> {
    await this.gamingModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }).exec();
  }

  // Seed demo data
  async seedDemoData(): Promise<void> {
    const demoData = [
      {
        title: 'Elden Ring Wins Game of the Year 2024',
        content: 'FromSoftware\'s masterpiece Elden Ring has been crowned Game of the Year at The Game Awards 2024. The open-world action RPG has captivated millions of players worldwide with its challenging combat and breathtaking world design.',
        category: 'news',
        gameTitle: 'Elden Ring',
        rating: 9.5,
        author: 'Gaming News Team',
        isFeatured: true,
        tags: ['Elden Ring', 'Game of the Year', 'FromSoftware'],
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
      },
      {
        title: 'GTA VI Trailer Breaks Viewing Records',
        content: 'Rockstar Games has released the highly anticipated trailer for Grand Theft Auto VI, breaking all previous viewing records within hours. The trailer showcases the vibrant city of Vice City and introduces new protagonists.',
        category: 'release',
        gameTitle: 'Grand Theft Auto VI',
        author: 'Gaming News Team',
        isFeatured: true,
        tags: ['GTA VI', 'Rockstar Games', 'Vice City'],
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
      },
      {
        title: 'FIFA 25 eWorld Cup Qualifiers Open',
        content: 'EA Sports has announced the opening of FIFA 25 eWorld Cup qualifiers. Players from around the world can now register to compete for the ultimate prize in competitive FIFA gaming.',
        category: 'esports',
        gameTitle: 'FIFA 25',
        author: 'Esports Reporter',
        tags: ['FIFA 25', 'eSports', 'Competitive Gaming'],
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
      }
    ];

    for (const data of demoData) {
      const existing = await this.gamingModel.findOne({ title: data.title });
      if (!existing) {
        await this.create(data);
      }
    }
  }
} 