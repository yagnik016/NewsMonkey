import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RssImportService } from '../modules/news/rss-import.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const rssImportService = app.get(RssImportService);

  console.log('Starting RSS import...');
  
  try {
    // Import from all categories
    const totalImported = await rssImportService.importAllCategories();
    console.log(`✅ Successfully imported ${totalImported} articles from RSS feeds`);
    
    // Test individual categories
    const categories = ['general', 'technology', 'business', 'sports'];
    for (const category of categories) {
      const imported = await rssImportService.importFromRss(category, 5);
      console.log(`📰 ${category}: ${imported} articles imported`);
    }
    
  } catch (error) {
    console.error('❌ Error during RSS import:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap(); 