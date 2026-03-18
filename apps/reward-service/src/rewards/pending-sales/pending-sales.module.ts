import { Module } from '@nestjs/common';
import { RewardsCoreModule } from '../core/core.module';
import { PendingSalesController } from './pending-sales.controller';
import { PendingSalesService } from './pending-sales.service';

@Module({
  imports: [RewardsCoreModule],
  controllers: [PendingSalesController],
  providers: [PendingSalesService],
})
export class PendingSalesModule {}
