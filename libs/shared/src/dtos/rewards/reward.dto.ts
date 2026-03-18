export interface RewardSummaryDto {
  customerId: string;
  points: number;
  blocked: number;
  available: number;
}

export interface RewardAdjustmentDto {
  customerId: string;
  adjustment: number;
  reason?: string;
}

export interface BlockRewardDto {
  customerId: string;
  amount: number;
  reason?: string;
}
