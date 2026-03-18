import { Module } from '@nestjs/common';
import { RewardsCoreService } from './core.service';

@Module({
  providers: [RewardsCoreService],
  exports: [RewardsCoreService],
})
export class RewardsCoreModule {}
