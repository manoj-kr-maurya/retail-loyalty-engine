import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TransactionDto } from '@shared/dtos/transaction.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<string> {
    return this.appService.getHello();
  }

  // listens to transactions coming from other services
  @MessagePattern('transaction.created')
  handleTransaction(@Payload() data: TransactionDto) {
    return this.appService.processTransaction(data);
  }
}
