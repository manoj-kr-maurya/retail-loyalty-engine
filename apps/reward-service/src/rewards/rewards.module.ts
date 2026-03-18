import { Module } from '@nestjs/common';
import { CashbackModule } from './cashback/cashback.module';
import { CustomersModule } from './customers/customers.module';
import { HealthModule } from './health/health.module';
import { PendingSalesModule } from './pending-sales/pending-sales.module';
import { PromoModule } from './promo/promo.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    HealthModule,
    CustomersModule,
    TransactionsModule,
    PromoModule,
    PendingSalesModule,
    CashbackModule,
  ],
})
export class RewardsModule {}
