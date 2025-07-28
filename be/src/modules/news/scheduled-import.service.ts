import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RssImportService } from './rss-import.service';

@Injectable()
export class ScheduledImportService {
  private readonly logger = new Logger(ScheduledImportService.name);

  constructor(private readonly rssImportService: RssImportService) {}

  // Run every 2 hours to keep news fresh
  @Cron(CronExpression.EVERY_2_HOURS)
  async handleScheduledImport() {
    this.logger.log('Starting scheduled RSS import...');
    
    try {
      const imported = await this.rssImportService.importAllCategories();
      this.logger.log(`✅ Scheduled import completed: ${imported} articles imported`);
    } catch (error) {
      this.logger.error(`❌ Scheduled import failed: ${error.message}`);
    }
  }

  // Run daily at 6 AM for comprehensive import
  @Cron('0 6 * * *')
  async handleDailyImport() {
    this.logger.log('Starting daily comprehensive RSS import...');
    
    try {
      const categories = ['general', 'technology', 'business', 'sports', 'entertainment', 'science'];
      let totalImported = 0;

      for (const category of categories) {
        const imported = await this.rssImportService.importFromRss(category, 30);
        totalImported += imported;
        this.logger.log(`📰 ${category}: ${imported} articles imported`);
      }

      this.logger.log(`✅ Daily import completed: ${totalImported} total articles imported`);
    } catch (error) {
      this.logger.error(`❌ Daily import failed: ${error.message}`);
    }
  }

  // Manual trigger for immediate import
  async triggerManualImport(category?: string) {
    this.logger.log(`Starting manual RSS import${category ? ` for ${category}` : ''}...`);
    
    try {
      if (category) {
        const imported = await this.rssImportService.importFromRss(category, 20);
        this.logger.log(`✅ Manual import completed: ${imported} articles imported for ${category}`);
        return imported;
      } else {
        const imported = await this.rssImportService.importAllCategories();
        this.logger.log(`✅ Manual import completed: ${imported} articles imported`);
        return imported;
      }
    } catch (error) {
      this.logger.error(`❌ Manual import failed: ${error.message}`);
      throw error;
    }
  }
} 