import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<string> {
    return this.appService.getHello();
  }

  @MessagePattern('notification.send')
  handleNotification(@Payload() payload: any) {
    return this.appService.sendNotification(payload);
  }
}
