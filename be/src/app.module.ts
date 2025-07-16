import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './modules/news/news.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LiveScoresModule } from './modules/live-scores/live-scores.module';
import { LiveBlogsModule } from './modules/live-blogs/live-blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot("mongodb+srv://yagnik016:9VEuaL6wkWUcnG94@cluster0.szvq3ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    NewsModule,
    AuthModule,
    UsersModule,
    LiveScoresModule,
    LiveBlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 