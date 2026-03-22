import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';

export class RegisterCustomerDto {
  phone?: string;
  email?: string;
  name?: string;
}

export class AddPurchaseDto {
  amount: number;
  description?: string;
}

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  registerCustomer(@Body() body: RegisterCustomerDto) {
    return this.customersService.registerCustomer(body);
  }

  @Get()
  listCustomers() {
    return this.customersService.listCustomers();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customersService.getCustomer(id);
  }

  @Post(':id/purchases')
  addPurchase(
    @Param('id') id: string,
    @Body() body: AddPurchaseDto,
  ) {
    return this.customersService.addPurchase(id, body.amount, body.description);
  }

  @Get(':id/purchases')
  getPurchaseHistory(@Param('id') id: string) {
    return this.customersService.getPurchaseHistory(id);
  }
}
