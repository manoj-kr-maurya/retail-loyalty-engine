import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export interface CustomerRecord {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
  createdAt: string;
}

export interface PurchaseRecord {
  id: string;
  customerId: string;
  amount: number;
  description?: string;
  createdAt: string;
}

@Injectable()
export class CustomersService {
  private customers = new Map<string, CustomerRecord>();
  private purchases = new Map<string, PurchaseRecord[]>();

  registerCustomer(input: {
    phone?: string;
    email?: string;
    name?: string;
  }) {
    const id = crypto.randomUUID();
    const record: CustomerRecord = {
      id,
      phone: input.phone,
      email: input.email,
      name: input.name,
      createdAt: new Date().toISOString(),
    };
    this.customers.set(id, record);
    return { ...record, qr: this.generateQrPayload(id) };
  }

  getCustomer(id: string) {
    const customer = this.customers.get(id);
    if (!customer) return null;
    return { ...customer, qr: this.generateQrPayload(id) };
  }

  listCustomers() {
    return Array.from(this.customers.values()).map((c) => ({
      ...c,
      qr: this.generateQrPayload(c.id),
    }));
  }

  addPurchase(customerId: string, amount: number, description?: string) {
    const customer = this.customers.get(customerId);
    if (!customer) return null;
    const purchase: PurchaseRecord = {
      id: crypto.randomUUID(),
      customerId,
      amount,
      description,
      createdAt: new Date().toISOString(),
    };
    const history = this.purchases.get(customerId) ?? [];
    history.push(purchase);
    this.purchases.set(customerId, history);
    return purchase;
  }

  getPurchaseHistory(customerId: string) {
    return this.purchases.get(customerId) ?? [];
  }

  private generateQrPayload(customerId: string) {
    const payload = `customer:${customerId}`;
    const buffer = Buffer.from(payload, 'utf-8');
    return `data:text/plain;base64,${buffer.toString('base64')}`;
  }
}
