import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

const app = express();
let isBootstrapped = false;

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
  await nestApp.init();
}

export default async function handler(req, res) {
  if (!isBootstrapped) {
    await bootstrap();
    isBootstrapped = true;
  }
  app(req, res);
} 