import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [RewardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
