import { Injectable } from '@nestjs/common';

import type {
  CustomerDto,
  SalesTransactionDto,
  PromoCodeDto,
} from '@shared/dtos';

/**
 * Central in-memory store for reward state.
 * Shared across reward submodules (promo, transactions, cashback, etc.).
 */
@Injectable()
export class RewardsCoreService {
  public customers = new Map<string, CustomerDto>();
  public transactions = new Map<string, SalesTransactionDto>();
  public promoCodes = new Map<string, PromoCodeDto>();
  public pendingSales = new Map<string, SalesTransactionDto>();
  public blockedBalances = new Map<string, number>();
  public promoClaims = new Map<string, any[]>();

  // Allows other modules to share state without duplicating storage.
}
