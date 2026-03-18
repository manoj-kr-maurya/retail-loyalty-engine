import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import type { CustomerDto, UpdateCustomerDto } from '@shared/dtos';
import { RewardsCoreService } from '../core/core.service';

@Injectable()
export class CustomersService {
  constructor(private readonly core: RewardsCoreService) {}

  registerCustomer(customer: CustomerDto) {
    const id = customer.id || crypto.randomUUID();
    const stored: CustomerDto = {
      ...customer,
      id,
      points: customer.points ?? 0,
      createdAt: customer.createdAt ?? new Date().toISOString(),
    };
    this.core.customers.set(id, stored);
    return stored;
  }

  updateCustomer(customerId: string, changes: UpdateCustomerDto) {
    const existing = this.core.customers.get(customerId);
    if (!existing) return null;
    const updated = { ...existing, ...changes };
    this.core.customers.set(customerId, updated);
    return updated;
  }

  getCustomer(customerId: string) {
    return this.core.customers.get(customerId) ?? null;
  }

  searchCustomers(query: string) {
    const normalized = query.toLowerCase();
    return Array.from(this.core.customers.values()).filter((c) => {
      return (
        (c.name?.toLowerCase().includes(normalized) ?? false) ||
        (c.phoneNumber?.includes(normalized) ?? false) ||
        c.id === query
      );
    });
  }

  getRewardBalance(customerId: string) {
    const customer = this.core.customers.get(customerId);
    const points = customer?.points ?? 0;
    const blocked = this.core.blockedBalances.get(customerId) ?? 0;
    return { customerId, points, blocked, available: points - blocked };
  }
}
