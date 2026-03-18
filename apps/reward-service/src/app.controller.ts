import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<string> {
    return this.appService.getHello();
  }

  @Get('points/:phone')
  getPoints(@Param('phone') phone: string) {
    return this.appService.getPoints(phone);
  }

  @MessagePattern('points.updated')
  handlePointsUpdate(@Payload() payload: { phone: string; points: number }) {
    this.appService.addPoints(payload.phone, payload.points);
    return { status: 'ok' };
  }
}
