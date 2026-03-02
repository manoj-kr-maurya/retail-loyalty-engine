import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // keep HTTP for customer queries
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 4003 },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('Customer service HTTP listening on 3001 and TCP 4003');
}
bootstrap();
