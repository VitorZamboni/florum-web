import { useEffect, useState } from "react";
import type { Address, AddressCepResponse } from "@/commons/address";
import AddressService from "@/services/address-service";
import { useSearchParams } from "react-router-dom";

export function useAddress() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressCep, setAddressCep] = useState<AddressCepResponse>(null!);
    const [searchParams] = useSearchParams();

    const cep = String(searchParams.get('cep') ?? "");

    useEffect(() => {
        async function loadAddresses() {
            try {
                const response = await AddressService.getAddresses();

                if (response.status == 200 && response.data) {
                    setAddresses(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar endereços ", error);
            }
        }
        loadAddresses();
    }, []);


    useEffect(() => {
        if(!cep) return;
        async function loadAddressByCep() {
            try {
                const response = await AddressService.getAddressByCep(cep);

                if (response.status == 200 && response.data) {
                    setAddressCep(response.data);
                }
            } catch (error) {
                console.error("Erro ao achar por cep ", error);
            }
        }
        loadAddressByCep();
    }, [cep])

    async function saveAddress(addressContent: Address) {
        try {
            const response = await AddressService.saveAddress(addressContent);

            if (response.status == 201 && response.data) {
                return response.data;
            }
        } catch (error) {
            console.error("Erro ao salvar endereço ", error);
        }
        return null;
    }

    async function deleteAddress(id: number) {
        try{
            const response = await AddressService.deleteAddress(id);

            if(response.status == 204){
                return true;
            }
        }catch (error){
            console.error("Erro ao deletar endereço ", error);
        }
        return false;
    }


    return {addresses, addressCep, saveAddress, deleteAddress};
}
