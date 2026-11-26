import { Input } from "@/components/input";
import type { Address } from "@/commons/address";
import { cepValidator, requiredValidator } from "@/utils/validators";
import { useAddressForm } from "./use-address-form";
import "./style.css";

interface AddressFormProps {
    onSaved: (address: Address) => void;
    onCancel: () => void;
}

export function AddressForm({ onSaved, onCancel }: AddressFormProps) {
    const { form, saving, changeField, changeCep, handleSubmit } = useAddressForm(onSaved);

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <div className="address-form-row">
                <div className="address-form-field">
                    <Input type="text" name="cep" label="CEP" placeholder="Somente números"
                        value={form.cep} changeValue={changeCep} validators={[requiredValidator, cepValidator]} />
                </div>
            </div>
            <div className="address-form-row">
                <div className="address-form-field address-form-field-large">
                    <Input type="text" name="street" label="Rua"
                        value={form.street} changeValue={changeField("street")} validators={[requiredValidator]} />
                </div>
                <div className="address-form-field">
                    <Input type="text" name="number" label="Número"
                        value={form.number} changeValue={changeField("number")} validators={[requiredValidator]} />
                </div>
            </div>
            <div className="address-form-row">
                <div className="address-form-field">
                    <Input type="text" name="complement" label="Complemento"
                        value={form.complement} changeValue={changeField("complement")} />
                </div>
                <div className="address-form-field">
                    <Input type="text" name="district" label="Bairro"
                        value={form.district} changeValue={changeField("district")} validators={[requiredValidator]} />
                </div>
            </div>
            <div className="address-form-row">
                <div className="address-form-field">
                    <Input type="text" name="city" label="Cidade"
                        value={form.city} changeValue={changeField("city")} validators={[requiredValidator]} />
                </div>
                <div className="address-form-field">
                    <Input type="text" name="state" label="Estado"
                        value={form.state} changeValue={changeField("state")} validators={[requiredValidator]} />
                </div>
                <div className="address-form-field">
                    <Input type="text" name="country" label="País"
                        value={form.country} changeValue={changeField("country")} validators={[requiredValidator]} />
                </div>
            </div>
            <div className="address-form-actions">
                <button type="button" className="button address-form-cancel" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="button address-form-save" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar endereço"}
                </button>
            </div>
        </form>
    );
}
