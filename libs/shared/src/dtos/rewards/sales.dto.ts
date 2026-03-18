export interface AddSalesEntryDto {
  customerId: string;
  shopId?: string;
  customerPhone?: string;
  amount: number;
  externalReference?: string;
}

export interface SalesTransactionDto {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  createdAt: string;
  externalReference?: string;
}

export interface TransactionProfileDto {
  customerId: string;
  transactionCount: number;
  totalAmount: number;
}
