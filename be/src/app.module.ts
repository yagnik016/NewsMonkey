import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LiveScoresModule } from './modules/live-scores/live-scores.module';
import { LiveBlogsModule } from './modules/live-blogs/live-blogs.module';
import { GamingModule } from './modules/gaming/gaming.module';
import { FinanceModule } from './modules/finance/finance.module';
import { PollsModule } from './modules/polls/polls.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://yagnik016:9VEuaL6wkWUcnG94@cluster0.szvq3ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    NewsModule,
    AuthModule,
    UsersModule,
    LiveScoresModule,
    LiveBlogsModule,
    GamingModule,
    FinanceModule,
    PollsModule,
    LeaderboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 