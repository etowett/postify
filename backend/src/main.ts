import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsAllowedOrigins = ['http://localhost:7060', 'http://127.0.0.1:7060'];

const appPort = process.env.PORT ?? 7070;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: corsAllowedOrigins,
    credentials: true,
  });

  // Use a global validation pipe if you have class-validator set up
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort);
  console.log(`Postify backend is running on http://localhost:${appPort}`);
}
bootstrap();
