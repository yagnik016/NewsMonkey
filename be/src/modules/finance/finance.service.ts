import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Finance, FinanceDocument } from './finance.schema';

@Injectable()
export class FinanceService {
  constructor(
    @InjectModel(Finance.name) private financeModel: Model<FinanceDocument>,
  ) {}

  async findAll(): Promise<Finance[]> {
    return this.financeModel.find({ isActive: true }).sort({ symbol: 1 }).exec();
  }

  async findByType(type: string): Promise<Finance[]> {
    return this.financeModel.find({ type, isActive: true }).sort({ symbol: 1 }).exec();
  }

  async findTopPerformers(limit: number = 5): Promise<Finance[]> {
    return this.financeModel.find({ isActive: true }).sort({ changePercent: -1 }).limit(limit).exec();
  }

  async findWorstPerformers(limit: number = 5): Promise<Finance[]> {
    return this.financeModel.find({ isActive: true }).sort({ changePercent: 1 }).limit(limit).exec();
  }

  async findById(id: string): Promise<Finance> {
    return this.financeModel.findById(id).exec();
  }

  async findBySymbol(symbol: string): Promise<Finance> {
    return this.financeModel.findOne({ symbol }).exec();
  }

  async create(financeData: Partial<Finance>): Promise<Finance> {
    const finance = new this.financeModel(financeData);
    return finance.save();
  }

  async update(id: string, financeData: Partial<Finance>): Promise<Finance> {
    return this.financeModel.findByIdAndUpdate(id, financeData, { new: true }).exec();
  }

  async updateBySymbol(symbol: string, financeData: Partial<Finance>): Promise<Finance> {
    return this.financeModel.findOneAndUpdate({ symbol }, financeData, { new: true }).exec();
  }

  async delete(id: string): Promise<Finance> {
    return this.financeModel.findByIdAndDelete(id).exec();
  }

  // Seed demo data
  async seedDemoData(): Promise<void> {
    const demoData = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 67000,
        change: 1400,
        changePercent: 2.1,
        type: 'crypto',
        marketCap: 1300000000000,
        volume: 25000000000,
        high24h: 67500,
        low24h: 66500,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 3200,
        change: -25,
        changePercent: -0.8,
        type: 'crypto',
        marketCap: 380000000000,
        volume: 15000000000,
        high24h: 3250,
        low24h: 3180,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        symbol: 'SPY',
        name: 'S&P 500 ETF',
        price: 5230.77,
        change: 23.45,
        changePercent: 0.45,
        type: 'stock',
        marketCap: 450000000000,
        volume: 5000000000,
        high24h: 5240,
        low24h: 5210,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 185.50,
        change: 2.30,
        changePercent: 1.26,
        type: 'stock',
        marketCap: 2900000000000,
        volume: 8000000000,
        high24h: 186.20,
        low24h: 183.80,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 245.80,
        change: -5.20,
        changePercent: -2.07,
        type: 'stock',
        marketCap: 780000000000,
        volume: 12000000000,
        high24h: 252.00,
        low24h: 243.50,
        isActive: true,
        lastUpdated: new Date()
      }
    ];

    for (const data of demoData) {
      const existing = await this.financeModel.findOne({ symbol: data.symbol });
      if (!existing) {
        await this.create(data);
      } else {
        await this.updateBySymbol(data.symbol, data);
      }
    }
  }
} 