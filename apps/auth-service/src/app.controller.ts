import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionDto } from '@shared/dtos/transaction.dto';
import { RegisterShopDto } from '@shared/dtos/register-shop.dto';
import { Observable, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<string> {
    return this.appService.getHello();
  }

  @Post('transaction')
  createTransaction(@Body() dto: TransactionDto): Observable<any> {
    return this.appService.createTransaction(dto);
  }

  @Post('register-shop')
  registerShop(@Body() dto: RegisterShopDto): Observable<any> {
    // stub: save to database and return id
    return of({ shopId: 'shop_' + Date.now(), ...dto });
  }
}
