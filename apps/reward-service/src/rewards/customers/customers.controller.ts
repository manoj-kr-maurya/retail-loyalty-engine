import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import type { CustomerDto, UpdateCustomerDto } from '@shared/dtos';

@Controller('rewards/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  registerCustomer(@Body() dto: CustomerDto) {
    return this.customersService.registerCustomer(dto);
  }

  @Put(':id')
  updateCustomer(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.updateCustomer(id, dto);
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customersService.getCustomer(id);
  }

  @Get()
  searchCustomers(@Query('q') q: string) {
    return this.customersService.searchCustomers(q);
  }

  @Get(':id/balance')
  getRewardBalance(@Param('id') id: string) {
    return this.customersService.getRewardBalance(id);
  }
}
