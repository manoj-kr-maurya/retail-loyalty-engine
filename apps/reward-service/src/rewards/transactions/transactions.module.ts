import { Module } from '@nestjs/common';
import { RewardsCoreModule } from '../core/core.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [RewardsCoreModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
