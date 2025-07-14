import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // News CRUD Operations
  async createNews(createNewsDto: CreateNewsDto): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return createdNews.save();
  }

  async findAllNews(query: any = {}): Promise<News[]> {
    const { page = 1, limit = 10, category, status, search, sortBy = 'publishedAt', sortOrder = 'desc' } = query;
    
    const filter: any = {};
    
    if (category) {
      if (isValidObjectId(category)) {
        filter.category = new Types.ObjectId(category);
      } else {
        const catDoc = await this.categoryModel.findOne({ slug: category }).exec();
        if (catDoc) {
          filter.category = catDoc._id;
        } else {
          // No such category, return empty result
          return [];
        }
      }
    }
    if (status) filter.status = status;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    return this.newsModel
      .find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
  }

  async findNewsById(id: string): Promise<News> {
    const news = await this.newsModel
      .findById(id)
      .populate('category', 'name slug')
      .exec();
    
    if (!news) {
      throw new NotFoundException('News not found');
    }

    // Increment view count
    await this.newsModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    return news;
  }

  async updateNews(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    const updatedNews = await this.newsModel
      .findByIdAndUpdate(id, updateNewsDto, { new: true })
      .populate('category', 'name slug')
      .exec();
    
    if (!updatedNews) {
      throw new NotFoundException('News not found');
    }
    
    return updatedNews;
  }

  async deleteNews(id: string): Promise<void> {
    const result = await this.newsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('News not found');
    }
  }

  // Category CRUD Operations
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    
    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }
    
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Category not found');
    }
  }

  // Special Queries
  async getBreakingNews(): Promise<News[]> {
    return this.newsModel
      .find({ isBreaking: true, status: 'published' })
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(5)
      .exec();
  }

  async getFeaturedNews(): Promise<News[]> {
    return this.newsModel
      .find({ isFeatured: true, status: 'published' })
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(10)
      .exec();
  }

  async getLiveBlogs(): Promise<News[]> {
    return this.newsModel
      .find({ isLiveBlog: true, status: 'published' })
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .exec();
  }

  async getNewsByCategory(categorySlug: string, query: any = {}): Promise<News[]> {
    const category = await this.categoryModel.findOne({ slug: categorySlug }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const { page = 1, limit = 10, sortBy = 'publishedAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    return this.newsModel
      .find({ category: category._id, status: 'published' })
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
  }

  async searchNews(searchTerm: string, query: any = {}): Promise<News[]> {
    const { page = 1, limit = 10, sortBy = 'publishedAt', sortOrder = 'desc' } = query;
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    return this.newsModel
      .find({ 
        $text: { $search: searchTerm },
        status: 'published'
      })
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
  }

  async getNewsStats(): Promise<any> {
    const totalNews = await this.newsModel.countDocuments({ status: 'published' });
    const totalViews = await this.newsModel.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    
    const popularNews = await this.newsModel
      .find({ status: 'published' })
      .sort({ views: -1 })
      .limit(5)
      .populate('category', 'name slug')
      .exec();

    return {
      totalNews,
      totalViews: totalViews[0]?.totalViews || 0,
      popularNews,
    };
  }
} 