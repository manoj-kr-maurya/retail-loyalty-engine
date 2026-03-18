import { Module } from '@nestjs/common';
import { RewardsCoreModule } from '../core/core.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [RewardsCoreModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
