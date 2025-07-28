import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NewsApiImportService } from './newsapi-import.service';
import { RssImportService } from './rss-import.service';
import { ScheduledImportService } from './scheduled-import.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly newsApiImportService: NewsApiImportService,
    private readonly rssImportService: RssImportService,
    private readonly scheduledImportService: ScheduledImportService,
  ) {}

  // News endpoints
  @Post()
  @ApiOperation({ summary: 'Create a new news article' })
  @ApiResponse({ status: 201, description: 'News article created successfully' })
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news articles with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, type: String })
  async getAllNews(@Query() query: any) {
    return this.newsService.findAllNews(query);
  }

  @Post('import-external')
  async importExternalNews(@Query('country') country: string, @Query('category') category: string) {
    const imported = await this.newsApiImportService.importTopHeadlines(country || 'us', category || 'general');
    return { message: `Imported ${imported} articles from NewsAPI.` };
  }

  // Place all specific routes before the generic :id route
  @Post('categories')
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.newsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  async getAllCategories() {
    return this.newsService.findAllCategories();
  }

  @Get('breaking')
  @ApiOperation({ summary: 'Get breaking news' })
  async getBreakingNews() {
    return this.newsService.getBreakingNews();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured news' })
  async getFeaturedNews() {
    return this.newsService.getFeaturedNews();
  }

  @Get('live-blogs')
  @ApiOperation({ summary: 'Get live blogs' })
  async getLiveBlogs() {
    return this.newsService.getLiveBlogs();
  }

  @Get('trending-tags')
  async getTrendingTags(@Query('limit') limit?: string) {
    return this.newsService.getTrendingTags(limit ? parseInt(limit) : 10);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search news articles' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async searchNews(@Query('q') searchTerm: string, @Query() query: any) {
    return this.newsService.searchNews(searchTerm, query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get news statistics' })
  async getNewsStats() {
    return this.newsService.getNewsStats();
  }

  @Get('category/:slug')
  @ApiOperation({ summary: 'Get news by category' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getNewsByCategory(@Param('slug') slug: string, @Query() query: any) {
    return this.newsService.getNewsByCategory(slug, query);
  }

  // Now the generic :id route
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific news article by ID' })
  async getNewsById(@Param('id') id: string) {
    return this.newsService.findNewsById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a news article' })
  async updateNews(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news article' })
  async deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(id);
  }

  // Category endpoints
  @Get('categories/:id')
  @ApiOperation({ summary: 'Get a specific category by ID' })
  async getCategoryById(@Param('id') id: string) {
    return this.newsService.findCategoryById(id);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update a category' })
  async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.newsService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete a category' })
  async deleteCategory(@Param('id') id: string) {
    return this.newsService.deleteCategory(id);
  }

  // RSS Import endpoints
  @Post('import/rss')
  @ApiOperation({ summary: 'Import news from RSS feeds' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'News imported successfully from RSS' })
  async importFromRss(
    @Query('category') category?: string,
    @Query('limit') limit?: number,
  ) {
    if (category) {
      const imported = await this.rssImportService.importFromRss(category, limit || 20);
      return { message: `Imported ${imported} articles from RSS feeds (${category})` };
    } else {
      const imported = await this.rssImportService.importAllCategories();
      return { message: `Imported ${imported} articles from RSS feeds` };
    }
  }

  @Post('import/rss/all')
  @ApiOperation({ summary: 'Import news from all RSS feeds' })
  @ApiResponse({ status: 200, description: 'News imported from all RSS feeds' })
  async importAllFromRss() {
    const imported = await this.rssImportService.importAllCategories();
    return { message: `Imported ${imported} articles from all RSS feeds` };
  }

  // Manual RSS Import endpoints
  @Post('import/rss/now')
  @ApiOperation({ summary: 'Trigger immediate RSS import' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'RSS import triggered successfully' })
  async triggerRssImport(@Query('category') category?: string) {
    try {
      const imported = await this.scheduledImportService.triggerManualImport(category);
      return { 
        message: `RSS import completed successfully`,
        imported,
        category: category || 'all categories'
      };
    } catch (error) {
      return {
        message: `RSS import failed: ${error.message}`,
        imported: 0,
        category: category || 'all categories',
        error: true
      };
    }
  }

  // Simple RSS import endpoint
  @Post('import/rss/simple')
  @ApiOperation({ summary: 'Simple RSS import without scheduled service' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Simple RSS import completed' })
  async simpleRssImport(@Query('category') category?: string) {
    try {
      if (category) {
        const imported = await this.rssImportService.importFromRss(category, 20);
        return { 
          message: `Simple RSS import completed`,
          imported,
          category
        };
      } else {
        const imported = await this.rssImportService.importAllCategories();
        return { 
          message: `Simple RSS import completed`,
          imported,
          category: 'all categories'
        };
      }
    } catch (error) {
      return {
        message: `Simple RSS import failed: ${error.message}`,
        imported: 0,
        category: category || 'all categories',
        error: true
      };
    }
  }

  // Simple health check endpoint
  @Get('health')
  @ApiOperation({ summary: 'Simple health check' })
  async healthCheck() {
    return {
      message: 'Backend is healthy',
      timestamp: new Date().toISOString(),
      status: 'ok'
    };
  }

  // Test endpoint to verify backend is working
  @Get('test')
  @ApiOperation({ summary: 'Test endpoint to verify backend functionality' })
  async testEndpoint() {
    try {
      return {
        message: 'Backend is working!',
        timestamp: new Date().toISOString(),
        services: {
          newsService: !!this.newsService,
          rssImportService: !!this.rssImportService,
          scheduledImportService: !!this.scheduledImportService
        }
      };
    } catch (error) {
      return {
        message: `Backend test failed: ${error.message}`,
        timestamp: new Date().toISOString(),
        error: true
      };
    }
  }
} 