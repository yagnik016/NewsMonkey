import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

let server: any = null;

async function bootstrap() {
  const app = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
  await nestApp.init();
  return serverlessExpress({ app });
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
} 