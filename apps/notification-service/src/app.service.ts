import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): Observable<string> {
    return of('Notification service ready');
  }

  sendNotification(payload: any): Observable<{ status: string }> {
    // stub: integrate SMS/WhatsApp providers (Twilio, MSG91)
    console.log('sendNotification called with', payload);
    return of({ status: 'sent' });
  }
}
