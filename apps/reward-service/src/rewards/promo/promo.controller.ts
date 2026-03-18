import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PromoService } from './promo.service';
import type {
  ApplyPromoCodeDto,
  ClaimPromoDto,
  PromoDiscountDto,
  PromoFilterDto,
  PromoValidateDto,
  PromoCodeDto,
} from '@shared/dtos';

@Controller('rewards/promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Get('offers')
  getPromoOffers() {
    return this.promoService.listPromoOffers(true);
  }

  @Post('offers/eligible')
  getEligiblePromoOffers(@Body() filter: PromoFilterDto) {
    return this.promoService.listEligiblePromoOffers(filter);
  }

  @Get('code/:code')
  getPromoCode(@Param('code') code: string) {
    return this.promoService.getPromoCode(code);
  }

  @Post('code/validate')
  validatePromoCode(@Body() dto: PromoValidateDto) {
    return this.promoService.validatePromoCode(dto);
  }

  @Post('cart/calculate')
  calculatePromoDiscount(@Body() dto: PromoDiscountDto) {
    return this.promoService.calculatePromoDiscount(dto);
  }

  @Post('cart/apply')
  applyPromoCode(@Body() dto: ApplyPromoCodeDto) {
    return this.promoService.applyPromoCode(dto);
  }

  @Delete('cart/apply/:cartId')
  removeAppliedPromoCode(@Param('cartId') cartId: string) {
    return this.promoService.removeAppliedPromoCode(cartId);
  }

  @Post('cart/claim')
  claimPromoCode(@Body() dto: ClaimPromoDto) {
    return this.promoService.claimPromoCode(dto);
  }

  @Post('code/generate')
  generatePromoCode(@Body() dto: PromoCodeDto) {
    return this.promoService.generatePromoCode(dto);
  }

  @Post('code/cancel/:code')
  cancelPromoCode(@Param('code') code: string) {
    return this.promoService.cancelOrReversePromoCode(code);
  }

  @Post('code/approve/:code')
  approvePromoCode(@Param('code') code: string) {
    return this.promoService.approvePromoCodePoints(code);
  }
}
