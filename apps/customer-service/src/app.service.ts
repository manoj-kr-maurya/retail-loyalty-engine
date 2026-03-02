import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  private pointsStore: Record<string, number> = {};

  getHello(): Observable<string> {
    return of('Customer service ready');
  }

  getPoints(phone: string): { points: number } {
    return { points: this.pointsStore[phone] || 0 };
  }

  addPoints(phone: string, points: number) {
    this.pointsStore[phone] = (this.pointsStore[phone] || 0) + points;
  }
}
