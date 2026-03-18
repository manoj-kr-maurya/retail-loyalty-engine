import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import type { UpdatePendingSaleDto, SalesTransactionDto } from '@shared/dtos';
import { RewardsCoreService } from '../core/core.service';

@Injectable()
export class PendingSalesService {
  constructor(private readonly core: RewardsCoreService) {}

  addOrUpdatePendingSale(dto: UpdatePendingSaleDto) {
    const id = dto.id ?? crypto.randomUUID();
    const record: SalesTransactionDto = {
      id,
      customerId: dto.customerId,
      amount: dto.amount,
      status: dto.status ?? 'pending',
      createdAt: new Date().toISOString(),
      externalReference: dto.externalReference,
    };
    this.core.pendingSales.set(id, record);
    return record;
  }

  listPendingSales() {
    return Array.from(this.core.pendingSales.values());
  }

  getPendingSaleByReference(ref: string) {
    return Array.from(this.core.pendingSales.values()).find((tx) => tx.externalReference === ref) ?? null;
  }

  getPendingSaleById(id: string) {
    return this.core.pendingSales.get(id) ?? null;
  }
}
