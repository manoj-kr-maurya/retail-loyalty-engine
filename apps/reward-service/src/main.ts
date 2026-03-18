import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional: expose a TCP microservice interface (e.g., for inter-service events)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 4004 },
  });

  await app.startAllMicroservices();
  await app.listen(3004);
  console.log('Reward service HTTP listening on 3004 and TCP 4004');
}

bootstrap();
