import { Module } from '@nestjs/common';
import { RewardsCoreModule } from '../core/core.module';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';

@Module({
  imports: [RewardsCoreModule],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
