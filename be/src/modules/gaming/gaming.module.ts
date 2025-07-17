import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamingController } from './gaming.controller';
import { GamingService } from './gaming.service';
import { Gaming, GamingSchema } from './gaming.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gaming.name, schema: GamingSchema }]),
  ],
  controllers: [GamingController],
  providers: [GamingService],
  exports: [GamingService],
})
export class GamingModule {} 