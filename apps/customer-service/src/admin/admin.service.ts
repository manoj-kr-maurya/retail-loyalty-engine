import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AdminService {
  private stores = new Map<string, any>();
  private brands = new Map<string, any>();
  private categories = new Map<string, any>();
  private events = new Map<string, any>();
  private vouchers = new Map<string, any>();
  private partners = new Map<string, any>([[
    'partner-1',
    { id: 'partner-1', name: 'Default Partner' },
  ]]);

  addStoreLocation(data: any) {
    const id = crypto.randomUUID();
    const stored = { id, ...data };
    this.stores.set(id, stored);
    return stored;
  }

  addBrand(data: any) {
    const id = crypto.randomUUID();
    const stored = { id, ...data };
    this.brands.set(id, stored);
    return stored;
  }

  addCategory(data: any) {
    const id = crypto.randomUUID();
    const stored = { id, ...data };
    this.categories.set(id, stored);
    return stored;
  }

  enrollEvent(data: any) {
    const id = crypto.randomUUID();
    const stored = { id, ...data, enrolledAt: new Date().toISOString() };
    this.events.set(id, stored);
    return stored;
  }

  issueGiftVoucher(dto: any) {
    const id = crypto.randomUUID();
    const stored = { id, ...dto, issuedAt: new Date().toISOString() };
    this.vouchers.set(id, stored);
    return stored;
  }

  claimGiftVoucher(voucherId: string, customerId: string) {
    return { voucherId, customerId, claimedAt: new Date().toISOString() };
  }

  fetchGiftVouchers(customerId: string) {
    return Array.from(this.vouchers.values()).filter((v) => v.customerId === customerId);
  }

  getAllPromoRedemptionPartners() {
    return Array.from(this.partners.values());
  }
}
