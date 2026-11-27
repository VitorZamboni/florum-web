import type { Address, AddressCepResponse, CreateAddressRequest, ShippingResponse } from "@/commons/address";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios"


const path = 'addresses';

const deleteAddress = async (id: number): Promise<IResponse<void>> => {
    return await api.del(`${path}/${id}`);
}

const saveAddress = async (data: CreateAddressRequest): Promise<IResponse<Address>> => {
    return await api.post<Address>(path, data);
}

const getAddressByCep = async (cep: string): Promise<IResponse<AddressCepResponse>> => {
    return await api.get<AddressCepResponse>(`${path}/cep/${cep}`)
}

const getAddresses = async (): Promise<IResponse<Address[]>> => {
    return await api.get<Address[]>(`${path}/user`);
}

const getShipping = async (id: number, subtotal: number): Promise<IResponse<ShippingResponse>> => {
    return await api.get<ShippingResponse>(`${path}/${id}/shipping`, { subtotal: subtotal.toFixed(2) });
}

export const AddressService = {
    deleteAddress,
    saveAddress,
    getAddressByCep, 
    getAddresses,
    getShipping
}
