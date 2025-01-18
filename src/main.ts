import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(`
    Server is running in: http://localhost:${process.env.PORT ?? 3000}
  `)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000,"0.0.0.0");                 //The ""0.0.0.0"" accepts all types of connections
}
bootstrap();
