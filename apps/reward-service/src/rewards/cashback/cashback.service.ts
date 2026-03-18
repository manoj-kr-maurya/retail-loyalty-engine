import { Injectable } from '@nestjs/common';

import { RewardsCoreService } from '../core/core.service';

@Injectable()
export class CashbackService {
  constructor(private readonly core: RewardsCoreService) {}

  blockRewardBalance(customerId: string, amount: number) {
    const current = this.core.blockedBalances.get(customerId) ?? 0;
    this.core.blockedBalances.set(customerId, current + amount);
    return { customerId, blocked: this.core.blockedBalances.get(customerId) };
  }

  releaseBlockedReward(customerId: string) {
    this.core.blockedBalances.set(customerId, 0);
    return { customerId, released: true };
  }

  commitBlockedReward(customerId: string) {
    const blocked = this.core.blockedBalances.get(customerId) ?? 0;
    const customer = this.core.customers.get(customerId);
    if (customer) {
      customer.points = (customer.points ?? 0) - blocked;
      this.core.customers.set(customerId, customer);
    }
    this.core.blockedBalances.set(customerId, 0);
    return { customerId, committed: blocked };
  }

  getCashbackTransactionByReference(reference: string) {
    const tx = Array.from(this.core.transactions.values()).find((t) => t.externalReference === reference);
    return tx ?? null;
  }
}
