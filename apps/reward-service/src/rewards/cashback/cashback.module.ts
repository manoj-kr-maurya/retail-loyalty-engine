import { Module } from '@nestjs/common';
import { RewardsCoreModule } from '../core/core.module';
import { CashbackController } from './cashback.controller';
import { CashbackService } from './cashback.service';

@Module({
  imports: [RewardsCoreModule],
  controllers: [CashbackController],
  providers: [CashbackService],
})
export class CashbackModule {}
