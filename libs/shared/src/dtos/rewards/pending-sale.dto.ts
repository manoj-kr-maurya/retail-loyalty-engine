export interface UpdatePendingSaleDto {
  id?: string;
  customerId: string;
  amount: number;
  status?: string;
  externalReference?: string;
}
