import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionDto } from '@shared/dtos/transaction.dto';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notifier: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    return of('Loyalty service ready');
  }

  processTransaction(transaction: TransactionDto): Observable<any> {
    // simple rule: 1 point per ₹10
    const points = Math.floor(transaction.amount / 10);
    // persist to DB, then notify and update customer record
    return of({ points }).pipe(
      tap(() => {
        this.customerClient.emit('points.updated', {
          phone: transaction.customerPhone,
          points,
        });
      }),
      switchMap((result) =>
        this.notifier.send('notification.send', {
          to: transaction.customerPhone,
          message: `You earned ${points} points`,
        }),
      ),
    );
  }
}
