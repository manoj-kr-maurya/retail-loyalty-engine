import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionDto } from '@shared/dtos/transaction.dto';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('LOYALTY_SERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    // returning as an Observable demonstrates RxJS pattern
    return of('Auth service (shopkeeper)');
  }

  // simulate creating a transaction and notifying loyalty service
  createTransaction(tx: TransactionDto): Observable<any> {
    // ClientProxy#send returns an Observable already, so pass through
    return this.client.send('transaction.created', tx);
  }
}
