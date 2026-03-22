export interface CustomerDto {
    id?: string;
    phoneNumber: string;
    name?: string;
    points?: number;
    shopId?: string;
    createdAt?: string;
}
export interface UpdateCustomerDto {
    name?: string;
    phoneNumber?: string;
    points?: number;
}
