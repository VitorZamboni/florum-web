import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext";
import { ToastContext } from "@/contexts/ToastContext";
import AddressService from "@/services/address-service";
import CouponService from "@/services/coupon-service";
import OrderService from "@/services/order-service";
import type { Address } from "@/commons/address";
import type { PaymentType } from "@/commons/order";

export const PAYMENT_OPTIONS: { value: PaymentType; label: string }[] = [
    { value: "PIX", label: "Pix" },
    { value: "CARTAOCREDITO", label: "Cartão de crédito" },
    { value: "CARTAODEBITO", label: "Cartão de débito" },
];

interface AppliedCoupon {
    code: string;
    discountAmount: number;
}

const getOrderErrorMessage = (status?: number) => {
    switch (status) {
        case 422: return "Algum produto não tem estoque suficiente para a quantidade escolhida";
        case 404: return "Endereço de entrega não encontrado";
        case 400: return "Não foi possível validar o pedido. Confira o cupom e os itens";
        default: return "Não foi possível finalizar o pedido";
    }
}

export function useCheckout() {
    const { cart, total: subtotal, reloadCart } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number>();
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [shipping, setShipping] = useState<number>();
    const [paymentType, setPaymentType] = useState<PaymentType>("PIX");
    const [couponInput, setCouponInput] = useState("");
    const [coupon, setCoupon] = useState<AppliedCoupon>();
    const [submitting, setSubmitting] = useState(false);

    const couponDiscount = coupon?.discountAmount ?? 0;
    const orderTotal = subtotal + (shipping ?? 0) - couponDiscount;
    const canConfirm = !!selectedAddressId && shipping !== undefined && !submitting;

    const loadAddresses = async () => {
        const response = await AddressService.getAddresses();
        const list = response.success && response.data ? response.data : [];
        setAddresses(list);
        setShowAddressForm(list.length === 0);
        setSelectedAddressId(current => list.some(a => a.id === current) ? current : list[0]?.id);
    }

    useEffect(() => {
        const init = async () => {
            await loadAddresses();
        };
        init();
    }, []); 

    useEffect(() => {
        if (!selectedAddressId || subtotal <= 0) return;

        let ignore = false;
        AddressService.getShipping(selectedAddressId, subtotal).then(response => {
            if (ignore) return; // resposta de uma seleção antiga: descarta
            if (response.success && response.data) {
                setShipping(response.data.shipping);
            } else {
                showToast("Não foi possível calcular o frete", "error");
            }
        });
        return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAddressId, subtotal]);

    const handleSelectAddress = (id: number) => {
        if (id === selectedAddressId) return;
        setShipping(undefined);
        setSelectedAddressId(id);
    }

    const handleAddressSaved = (address: Address) => {
        setAddresses(prev => [...prev, address]);
        setShowAddressForm(false);
        handleSelectAddress(address.id);
    }

    const handleDeleteAddress = async (id: number) => {
        if (!window.confirm("Deseja excluir este endereço?")) return;

        const response = await AddressService.deleteAddress(id);
        if (!response.success) {
            showToast("Não foi possível excluir o endereço", "error");
            return;
        }
        if (id === selectedAddressId) setShipping(undefined);
        await loadAddresses();
    }

    const handleApplyCoupon = async () => {
        const code = couponInput.trim();
        if (!code) return;

        const response = await CouponService.getByCode(code);
        if (!response.success || !response.data) {
            showToast(response.status === 400 ? "Cupom expirado" : "Cupom não encontrado", "error");
            return;
        }
        if (response.data.discountAmount >= subtotal) {
            showToast("O cupom precisa ser menor que o valor dos produtos", "error");
            return;
        }
        setCoupon({ code, discountAmount: response.data.discountAmount });
        showToast("Cupom aplicado!", "success");
    }

    const handleRemoveCoupon = () => {
        setCoupon(undefined);
        setCouponInput("");
    }

    const handleConfirmOrder = async () => {
        if (!selectedAddressId) {
            showToast("Selecione um endereço de entrega", "error");
            return;
        }

        setSubmitting(true);
        const response = await OrderService.postOrder({
            addressId: selectedAddressId,
            paymentType,
            couponCode: coupon?.code,
            items: cart.cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity })),
        });
        setSubmitting(false);

        if (!response.success) {
            showToast(getOrderErrorMessage(response.status), "error");
            return;
        }

        showToast("Pedido realizado com sucesso!", "success");
        navigate("/orders");
        reloadCart(); 
    }

    return {
        cart,
        addresses,
        selectedAddressId,
        showAddressForm,
        setShowAddressForm,
        shipping,
        paymentType,
        setPaymentType,
        couponInput,
        setCouponInput,
        coupon,
        couponDiscount,
        orderTotal,
        canConfirm,
        submitting,
        handleSelectAddress,
        handleAddressSaved,
        handleDeleteAddress,
        handleApplyCoupon,
        handleRemoveCoupon,
        handleConfirmOrder,
    };
}
