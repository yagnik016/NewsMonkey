import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class NewsApiImportService {
  private readonly apiKey = process.env.NEWSAPI_KEY;
  private readonly baseUrl = 'https://newsapi.org/v2';
  private readonly logger = new Logger(NewsApiImportService.name);

  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // Map NewsAPI category to local category ObjectId
  async getCategoryId(newsApiCategory: string): Promise<string | null> {
    const slug = newsApiCategory.toLowerCase().replace(/ /g, '-');
    const category = await this.categoryModel.findOne({ slug });
    return category ? category._id : null;
  }

  async importTopHeadlines(country = 'us', category = 'general') {
    const url = `${this.baseUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    const { data } = await axios.get(url);
    let imported = 0;
    for (const article of data.articles) {
      const categoryId = await this.getCategoryId(category);
      if (!categoryId) continue;
      const newsDoc = {
        title: article.title,
        content: article.content || article.description || '',
        summary: article.description || '',
        author: article.author || 'NewsAPI',
        tags: [category],
        category: categoryId,
        status: 'published',
        images: article.urlToImage ? [article.urlToImage] : [],
        isBreaking: false,
        isFeatured: false,
        isLiveBlog: false,
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        seo: {
          metaTitle: article.title,
          metaDescription: article.description,
          keywords: [category]
        },
        social: {},
        source: 'newsapi',
        externalUrl: article.url
      };
      await this.newsModel.updateOne(
        { externalUrl: article.url },
        { $set: newsDoc },
        { upsert: true }
      );
      imported++;
    }
    this.logger.log(`Imported ${imported} articles from NewsAPI (${category})`);
    return imported;
  }
} 