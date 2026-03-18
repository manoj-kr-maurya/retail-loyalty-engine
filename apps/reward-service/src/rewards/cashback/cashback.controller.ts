import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CashbackService } from './cashback.service';
import type { BlockRewardDto } from '@shared/dtos';

@Controller('rewards/cashback')
export class CashbackController {
  constructor(private readonly cashbackService: CashbackService) {}

  @Post('block')
  blockRewardBalance(@Body() dto: BlockRewardDto) {
    return this.cashbackService.blockRewardBalance(dto.customerId, dto.amount);
  }

  @Post('block/commit/:customerId')
  commitRedemption(@Param('customerId') customerId: string) {
    return this.cashbackService.commitBlockedReward(customerId);
  }

  @Post('block/release/:customerId')
  releaseRedemption(@Param('customerId') customerId: string) {
    return this.cashbackService.releaseBlockedReward(customerId);
  }

  @Get('reference/:reference')
  fetchCashbackByReference(@Param('reference') reference: string) {
    return this.cashbackService.getCashbackTransactionByReference(reference);
  }
}
