import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import * as xml2js from 'xml2js';

@Injectable()
export class RssImportService {
  private readonly logger = new Logger(RssImportService.name);

  // Free RSS feeds from major news sources
  private readonly rssFeeds = {
    'general': [
      'https://feeds.bbci.co.uk/news/rss.xml',
      'https://feeds.reuters.com/reuters/topNews',
      'http://rss.cnn.com/rss/edition.rss'
    ],
    'technology': [
      'https://feeds.bbci.co.uk/news/technology/rss.xml',
      'https://www.theverge.com/rss/index.xml'
    ],
    'business': [
      'https://feeds.bbci.co.uk/news/business/rss.xml',
      'https://feeds.reuters.com/reuters/businessNews'
    ],
    'sports': [
      'https://feeds.bbci.co.uk/sport/rss.xml',
      'https://www.espn.com/espn/rss/news'
    ],
    'entertainment': [
      'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'
    ],
    'science': [
      'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml'
    ]
  };

  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // Map RSS category to local category ObjectId
  async getCategoryId(category: string): Promise<string | null> {
    const slug = category.toLowerCase().replace(/ /g, '-');
    const categoryDoc = await this.categoryModel.findOne({ slug });
    return categoryDoc ? categoryDoc._id.toString() : null;
  }

  // Parse RSS XML to JSON
  async parseRssXml(xmlData: string): Promise<any[]> {
    try {
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlData);
      
      // Handle different RSS formats
      const items = result.rss?.channel?.item || result.feed?.entry || [];
      return Array.isArray(items) ? items : [items];
    } catch (error) {
      this.logger.error(`Error parsing RSS XML: ${error.message}`);
      return [];
    }
  }

  // Fetch RSS feed
  async fetchRssFeed(url: string): Promise<any[]> {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'NewsMonkey/1.0 (RSS Reader)'
        }
      });
      return await this.parseRssXml(response.data);
    } catch (error) {
      this.logger.error(`Error fetching RSS feed ${url}: ${error.message}`);
      return [];
    }
  }

  // Import news from RSS feeds
  async importFromRss(category = 'general', limit = 20) {
    const feeds = this.rssFeeds[category] || this.rssFeeds.general;
    const categoryId = await this.getCategoryId(category);
    
    if (!categoryId) {
      this.logger.error(`Category not found: ${category}`);
      return 0;
    }

    let imported = 0;
    const allArticles = [];

    // Fetch from all feeds for this category
    for (const feedUrl of feeds) {
      try {
        const articles = await this.fetchRssFeed(feedUrl);
        allArticles.push(...articles);
      } catch (error) {
        this.logger.error(`Failed to fetch from ${feedUrl}: ${error.message}`);
      }
    }

    // Process articles
    for (const article of allArticles.slice(0, limit)) {
      try {
        const newsDoc = {
          title: article.title || article['media:title'] || 'Untitled',
          content: article.description || article.content || article.summary || '',
          summary: article.description || article.summary || '',
          author: article.author || article['dc:creator'] || 'RSS Feed',
          tags: [category],
          category: categoryId,
          status: 'published',
          images: article['media:content'] ? [article['media:content'].$.url] : 
                  article['enclosure'] ? [article['enclosure'].url] : [],
          isBreaking: false,
          isFeatured: false,
          isLiveBlog: false,
          publishedAt: article.pubDate ? new Date(article.pubDate) : 
                      article.published ? new Date(article.published) : new Date(),
          seo: {
            metaTitle: article.title || article['media:title'] || 'Untitled',
            metaDescription: article.description || article.summary || '',
            keywords: [category]
          },
          social: {},
          source: 'rss',
          externalUrl: article.link || article.url || ''
        };

        // Use link as unique identifier to avoid duplicates
        const uniqueId = article.link || article.url || article.guid;
        if (uniqueId) {
          await this.newsModel.updateOne(
            { externalUrl: uniqueId },
            { $set: newsDoc },
            { upsert: true }
          );
          imported++;
        }
      } catch (error) {
        this.logger.error(`Error processing article: ${error.message}`);
      }
    }

    this.logger.log(`Imported ${imported} articles from RSS feeds (${category})`);
    return imported;
  }

  // Import from all categories
  async importAllCategories() {
    const categories = Object.keys(this.rssFeeds);
    let totalImported = 0;

    for (const category of categories) {
      const imported = await this.importFromRss(category, 10);
      totalImported += imported;
    }

    this.logger.log(`Total imported: ${totalImported} articles from RSS feeds`);
    return totalImported;
  }
} 