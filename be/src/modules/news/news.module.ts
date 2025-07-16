import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News, NewsSchema } from './schemas/news.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { NewsApiImportService } from './newsapi-import.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsApiImportService],
  exports: [NewsService],
})
export class NewsModule {} 