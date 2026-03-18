import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

/**
 * Admin endpoints (stores, brands, categories, events, vouchers).
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('stores')
  addStoreLocation(@Body() data: any) {
    return this.adminService.addStoreLocation(data);
  }

  @Post('brands')
  addBrand(@Body() data: any) {
    return this.adminService.addBrand(data);
  }

  @Post('categories')
  addCategory(@Body() data: any) {
    return this.adminService.addCategory(data);
  }

  @Post('events/enroll')
  enrollEvent(@Body() data: any) {
    return this.adminService.enrollEvent(data);
  }

  @Post('vouchers')
  issueGiftVoucher(@Body() dto: any) {
    return this.adminService.issueGiftVoucher(dto);
  }

  @Post('vouchers/claim')
  claimGiftVoucher(@Body() body: { voucherId: string; customerId: string }) {
    return this.adminService.claimGiftVoucher(body.voucherId, body.customerId);
  }

  @Get('vouchers/:customerId')
  fetchGiftVouchers(@Param('customerId') customerId: string) {
    return this.adminService.fetchGiftVouchers(customerId);
  }

  @Get('partners')
  listRedeemPartners() {
    return this.adminService.getAllPromoRedemptionPartners();
  }
}
