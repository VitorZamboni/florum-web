export interface AddressCepResponse {
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
}

export interface Address {
    id: number;
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    country: string;
    complement?: string;
}

export type CreateAddressRequest = Omit<Address, 'id'>;

export interface ShippingResponse {
    shipping: number;
}
