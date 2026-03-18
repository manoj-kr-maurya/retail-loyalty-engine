import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import type { AddSalesEntryDto } from '@shared/dtos';

@Controller('rewards/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('sales')
  addSalesEntry(@Body() dto: AddSalesEntryDto) {
    return this.transactionsService.addSalesEntry(dto);
  }

  @Get('customer/:id')
  listCustomerTransactions(@Param('id') id: string) {
    return this.transactionsService.listCustomerTransactions(id);
  }

  @Get('customer/:id/profile')
  getCustomerTransactionProfile(@Param('id') id: string) {
    return this.transactionsService.getTransactionProfile(id);
  }

  @Get('summary/external/:externalReference')
  getTransactionRewardSummary(@Param('externalReference') externalReference: string) {
    return this.transactionsService.getTransactionRewardSummaryByExternalRef(externalReference);
  }
}
