import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { CartContext } from "@/contexts/CartContext";
import { AddressForm } from "@/components/address-form";
import { FREE_SHIPPING_THRESHOLD, getFinalPrice, hasFreeShipping } from "@/utils/price";
import { PAYMENT_OPTIONS, useCheckout } from "./use-checkout";
import "./style.css";

const formatCep = (cep: string) => `${cep.slice(0, 5)}-${cep.slice(5)}`;

export function CheckoutPage() {
    const { productTotal, discount, total } = useContext(CartContext);
    const {
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
    } = useCheckout();

    if (cart.cartItems.length === 0) {
        return (
            <div className="checkout checkout-empty card">
                <p>Seu carrinho está vazio.</p>
                <Link to="/products">Ver produtos</Link>
            </div>
        );
    }

    const shippingLabel = () => {
        if (!selectedAddressId) return "Selecione um endereço";
        if (shipping === undefined) return "Calculando...";
        if (shipping === 0) return "Grátis";
        return `R$ ${shipping.toFixed(2)}`;
    }

    return (
        <div className="checkout">
            <div className="checkout-main">
                <section className="card">
                    <h3>Endereço de entrega</h3>
                    {addresses.map((address) => (
                        <label
                            key={address.id}
                            className={`checkout-option ${selectedAddressId === address.id ? "selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.id}
                                onChange={() => handleSelectAddress(address.id)}
                            />
                            <div className="checkout-address-text">
                                <strong>
                                    {address.street}, {address.number}
                                    {address.complement ? ` - ${address.complement}` : ""}
                                </strong>
                                <span>
                                    {address.district} - {address.city}/{address.state} - CEP {formatCep(address.cep)}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="checkout-address-delete"
                                aria-label="Excluir endereço"
                                onClick={(e) => {
                                    e.preventDefault(); // não seleciona o endereço ao clicar na lixeira
                                    handleDeleteAddress(address.id);
                                }}
                            >
                                <FiTrash2 />
                            </button>
                        </label>
                    ))}

                    {showAddressForm ? (
                        <AddressForm onSaved={handleAddressSaved} onCancel={() => setShowAddressForm(false)} />
                    ) : (
                        <button className="checkout-link-button" onClick={() => setShowAddressForm(true)}>
                            + Cadastrar novo endereço
                        </button>
                    )}
                </section>

                <section className="card">
                    <h3>Pagamento</h3>
                    {PAYMENT_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className={`checkout-option ${paymentType === option.value ? "selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentType === option.value}
                                onChange={() => setPaymentType(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </section>

                <section className="card">
                    <h3>Itens</h3>
                    {cart.cartItems.map((item) => (
                        <div key={item.id} className="checkout-line">
                            <span>{item.quantity}x {item.product.name}</span>
                            <span>R$ {(getFinalPrice(item.product) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </section>
            </div>

            <aside className="checkout-summary card">
                <h3>Resumo</h3>

                <div className="checkout-coupon">
                    {coupon ? (
                        <div className="checkout-line">
                            <span>Cupom <strong>{coupon.code}</strong></span>
                            <button className="checkout-link-button" onClick={handleRemoveCoupon}>Remover</button>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Código de desconto"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                            />
                            <button className="button" onClick={handleApplyCoupon}>Aplicar</button>
                        </>
                    )}
                </div>

                <div className="checkout-line"><span>Produtos</span><span>R$ {productTotal.toFixed(2)}</span></div>
                <div className="checkout-line"><span>Descontos</span><span>- R$ {discount.toFixed(2)}</span></div>
                {coupon && (
                    <div className="checkout-line"><span>Cupom</span><span>- R$ {couponDiscount.toFixed(2)}</span></div>
                )}
                <div className="checkout-line"><span>Frete</span><span>{shippingLabel()}</span></div>
                {!hasFreeShipping(total) && (
                    <p className="checkout-hint">
                        Faltam R$ {(FREE_SHIPPING_THRESHOLD - total + 0.01).toFixed(2)} para ganhar frete grátis
                    </p>
                )}
                <div className="checkout-line checkout-total"><span>Total</span><span>R$ {orderTotal.toFixed(2)}</span></div>

                <button className="button checkout-confirm" disabled={!canConfirm} onClick={handleConfirmOrder}>
                    {submitting ? "Finalizando..." : "Confirmar pedido"}
                </button>
            </aside>
        </div>
    );
}
