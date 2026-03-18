import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AdminModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
