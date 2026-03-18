import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import type {
  ApplyPromoCodeDto,
  ClaimPromoDto,
  PromoCodeDto,
  PromoDiscountDto,
  PromoFilterDto,
  PromoValidateDto,
} from '@shared/dtos';
import { RewardsCoreService } from '../core/core.service';

@Injectable()
export class PromoService {
  constructor(private readonly core: RewardsCoreService) {}

  listPromoOffers(activeOnly = true) {
    const offers = Array.from(this.core.promoCodes.values());
    if (activeOnly) return offers.filter((o) => !o.disabled);
    return offers;
  }

  listEligiblePromoOffers(filter: PromoFilterDto) {
    const offers = this.listPromoOffers(true);
    return offers.filter((offer) => {
      if (filter.minPurchase && offer.minPurchase && filter.minPurchase < offer.minPurchase) return false;
      if (filter.customerId && offer.customerId && offer.customerId !== filter.customerId) return false;
      return true;
    });
  }

  getPromoCode(code: string) {
    return this.core.promoCodes.get(code) ?? null;
  }

  validatePromoCode(dto: PromoValidateDto) {
    const promo = this.getPromoCode(dto.code);
    if (!promo) return { valid: false, reason: 'NOT_FOUND' };

    if (promo.disabled) return { valid: false, reason: 'DISABLED' };

    return { valid: true, code: promo.code, discount: promo.discount || 0 };
  }

  calculatePromoDiscount(dto: PromoDiscountDto) {
    const promo = this.getPromoCode(dto.code);
    if (!promo) return { discount: 0, message: 'Promo not found' };
    const discount = promo.discount ?? 0;
    return { discount, totalAfterDiscount: Math.max(0, dto.cartTotal - discount) };
  }

  applyPromoCode(dto: ApplyPromoCodeDto) {
    const promo = this.getPromoCode(dto.code);
    if (!promo) return { success: false, message: 'Promo not found' };
    const applied = { ...promo, appliedAt: new Date().toISOString(), cartId: dto.cartId };
    return { success: true, applied };
  }

  removeAppliedPromoCode(cartId: string) {
    return { success: true, cartId };
  }

  claimPromoCode(dto: ClaimPromoDto) {
    const claims = this.core.promoClaims.get(dto.customerId) ?? [];
    const claim = { id: crypto.randomUUID(), ...dto, claimedAt: new Date().toISOString() };
    claims.push(claim);
    this.core.promoClaims.set(dto.customerId, claims);
    return claim;
  }

  generatePromoCode(dto: PromoCodeDto) {
    const code = dto.code || crypto.randomUUID();
    const stored: PromoCodeDto = {
      ...dto,
      code,
      disabled: dto.disabled ?? false,
      generatedBy: dto.generatedBy ?? 'manual',
    };
    this.core.promoCodes.set(code, stored);
    return stored;
  }

  cancelOrReversePromoCode(code: string) {
    const promo = this.core.promoCodes.get(code);
    if (!promo) return null;
    promo.disabled = true;
    return { code, cancelledAt: new Date().toISOString(), promo };
  }

  approvePromoCodePoints(code: string) {
    const promo = this.core.promoCodes.get(code);
    if (!promo) return { code, approved: false, reason: 'not_found' };
    return { code, approved: true, approvedAt: new Date().toISOString(), promo };
  }
}
