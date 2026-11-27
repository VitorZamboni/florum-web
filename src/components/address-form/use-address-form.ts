import { useContext, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import AddressService from "@/services/address-service";
import type { Address, CreateAddressRequest } from "@/commons/address";

const emptyForm = (): CreateAddressRequest => ({
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    country: "Brasil",
});

const requiredFields: (keyof CreateAddressRequest)[] = ["street", "number", "district", "city", "state", "country"];

export function useAddressForm(onSaved: (address: Address) => void) {
    const [form, setForm] = useState<CreateAddressRequest>(emptyForm());
    const [saving, setSaving] = useState(false);
    const { showToast } = useContext(ToastContext);

    const changeField = (field: keyof CreateAddressRequest) => (value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const changeCep = async (value: string) => {
        const cep = value.replace(/\D/g, "").slice(0, 8);
        setForm(prev => ({ ...prev, cep }));
        if (cep.length !== 8) return;

        const response = await AddressService.getAddressByCep(cep);
        if (!response.success || !response.data) {
            showToast("CEP não encontrado", "error");
            return;
        }

        const found = response.data;
        setForm(prev => ({
            ...prev,
            street: found.street || prev.street,
            district: found.district || prev.district,
            city: found.city || prev.city,
            state: found.state || prev.state,
            country: found.country || prev.country,
        }));
    }

    const isValid = () =>
        form.cep.length === 8 && requiredFields.every(field => form[field]?.trim());

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!isValid()) {
            showToast("Preencha todos os campos obrigatórios do endereço", "error");
            return;
        }

        setSaving(true);
        const response = await AddressService.saveAddress(form);
        setSaving(false);

        if (!response.success || !response.data) {
            showToast("Não foi possível salvar o endereço. Confira os dados", "error");
            return;
        }

        setForm(emptyForm());
        showToast("Endereço cadastrado!", "success");
        onSaved(response.data);
    }

    return { form, saving, changeField, changeCep, handleSubmit };
}
