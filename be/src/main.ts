import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MODE } from './config/apiConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NewsMonkey API')
    .setDescription('The NewsMonkey API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3005;
  await app.listen(port);

  const baseUrl = MODE === 'live'
    ? 'https://newsmonkey-be.vercel.app'
    : `http://localhost:${port}`;

  console.log(`🚀 Application is running [${MODE.toUpperCase()}] on: ${baseUrl}`);
  console.log(`📚 API Documentation: ${baseUrl}/api/docs`);
}

bootstrap(); 