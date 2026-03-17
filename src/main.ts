import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDB } from './database';

async function bootstrap() {
await connectDB();

  const app = await NestFactory.create(AppModule);
   app.enableCors()
  await app.listen(3000);
}
bootstrap();
