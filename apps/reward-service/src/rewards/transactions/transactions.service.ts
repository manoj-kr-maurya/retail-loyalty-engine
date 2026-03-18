import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import type { AddSalesEntryDto, SalesTransactionDto, TransactionProfileDto } from '@shared/dtos';
import { RewardsCoreService } from '../core/core.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly core: RewardsCoreService) {}

  addSalesEntry(dto: AddSalesEntryDto) {
    const id = crypto.randomUUID();
    const entry: SalesTransactionDto = {
      id,
      status: 'completed',
      createdAt: new Date().toISOString(),
      ...dto,
    };

    this.core.transactions.set(id, entry);

    const customer = this.core.customers.get(dto.customerId);
    if (customer) {
      customer.points = (customer.points ?? 0) + Math.floor(dto.amount);
      this.core.customers.set(dto.customerId, customer);
    }

    return entry;
  }

  listCustomerTransactions(customerId: string) {
    return Array.from(this.core.transactions.values()).filter((tx) => tx.customerId === customerId);
  }

  getTransactionProfile(customerId: string): TransactionProfileDto {
    const transactions = this.listCustomerTransactions(customerId);
    const total = transactions.reduce((acc, cur) => acc + (cur.amount ?? 0), 0);
    return { customerId, transactionCount: transactions.length, totalAmount: total };
  }

  getTransactionRewardSummaryByExternalRef(externalReference: string) {
    const tx = Array.from(this.core.transactions.values()).find((t) => t.externalReference === externalReference);
    return {
      externalReference,
      transaction: tx ?? null,
      rewardPoints: tx ? Math.floor(tx.amount) : 0,
    };
  }
}
