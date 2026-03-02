import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { port: 4001 },
  });
  await app.listen();
  console.log('Loyalty service listening on TCP port 4001');
}
bootstrap();
