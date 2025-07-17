import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Finance } from './finance.schema';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  async getAllFinance(@Query('type') type?: string): Promise<Finance[]> {
    if (type) {
      return this.financeService.findByType(type);
    }
    return this.financeService.findAll();
  }

  @Get('crypto')
  async getCrypto(): Promise<Finance[]> {
    return this.financeService.findByType('crypto');
  }

  @Get('stocks')
  async getStocks(): Promise<Finance[]> {
    return this.financeService.findByType('stock');
  }

  @Get('top-performers')
  async getTopPerformers(@Query('limit') limit?: string): Promise<Finance[]> {
    const limitNum = limit ? parseInt(limit) : 5;
    return this.financeService.findTopPerformers(limitNum);
  }

  @Get('worst-performers')
  async getWorstPerformers(@Query('limit') limit?: string): Promise<Finance[]> {
    const limitNum = limit ? parseInt(limit) : 5;
    return this.financeService.findWorstPerformers(limitNum);
  }

  @Get('market-summary')
  async getMarketSummary(): Promise<{
    totalAssets: number;
    topGainers: Finance[];
    topLosers: Finance[];
    cryptoCount: number;
    stockCount: number;
  }> {
    const allFinance = await this.financeService.findAll();
    const crypto = await this.financeService.findByType('crypto');
    const stocks = await this.financeService.findByType('stock');
    const topGainers = await this.financeService.findTopPerformers(3);
    const topLosers = await this.financeService.findWorstPerformers(3);

    return {
      totalAssets: allFinance.length,
      topGainers,
      topLosers,
      cryptoCount: crypto.length,
      stockCount: stocks.length,
    };
  }

  @Get(':id')
  async getFinanceById(@Param('id') id: string): Promise<Finance> {
    return this.financeService.findById(id);
  }

  @Get('symbol/:symbol')
  async getFinanceBySymbol(@Param('symbol') symbol: string): Promise<Finance> {
    return this.financeService.findBySymbol(symbol);
  }

  @Post()
  async createFinance(@Body() financeData: Partial<Finance>): Promise<Finance> {
    return this.financeService.create(financeData);
  }

  @Put(':id')
  async updateFinance(@Param('id') id: string, @Body() financeData: Partial<Finance>): Promise<Finance> {
    return this.financeService.update(id, financeData);
  }

  @Delete(':id')
  async deleteFinance(@Param('id') id: string): Promise<Finance> {
    return this.financeService.delete(id);
  }

  @Post('seed')
  async seedDemoData(): Promise<{ message: string }> {
    await this.financeService.seedDemoData();
    return { message: 'Demo data seeded successfully' };
  }
} 