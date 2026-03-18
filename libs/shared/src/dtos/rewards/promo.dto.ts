export interface PromoCodeDto {
  code: string;
  description?: string;
  discount?: number;
  disabled?: boolean;
  minPurchase?: number;
  customerId?: string;
  generatedBy?: string;
}

export interface PromoFilterDto {
  customerId?: string;
  minPurchase?: number;
}

export interface PromoValidateDto {
  code: string;
}

export interface PromoDiscountDto {
  code: string;
  cartTotal: number;
}

export interface ApplyPromoCodeDto {
  cartId: string;
  code: string;
}

export interface ClaimPromoDto {
  customerId: string;
  code: string;
  orderReference?: string;
  claimReference?: string;
}

export interface PromoVoucherDto {
  customerId: string;
  amount: number;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}
