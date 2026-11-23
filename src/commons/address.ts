export interface AddressCepResponse{
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
}

export interface Address{
    id: number;
    cep: string;
    street: string;
    number: number;
    district: string;
    city: string;
    state: string;
    country: string;
    complement: string;
}