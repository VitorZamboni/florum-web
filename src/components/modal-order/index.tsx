import { useOrder } from "./use-order";
import "./style.css"
import ProductOrder from "../product-order";
import type { PaymentType } from "@/commons/order";

export interface ModalOrderProps {
    isOpen: boolean;
    orderId: number;
}

function paymentType(type: PaymentType): string {
    switch (type) {
        case 'PIX':
            return "PIX";
        case 'CARTAOCREDITO':
            return "Cartão de crédito";
        case 'CARTAODEBITO':
            return "Cartão de débito";
        default:
            return "Tipo de pagamento não identificado";
    }
};

export function ModalOrder({ isOpen, orderId }: ModalOrderProps) {
    const order = useOrder(orderId);
    console.log(order);

    if (isOpen) {
        return (
            <div className="order-modal">
                <div className="order-items">
                    {order.orderItems.map(item => {
                        return (
                            <ProductOrder item={item} />
                        );
                    })}
                </div>
                <div className="order-infos">
                    <div className="order-payment-prices">
                        <div className="order-payment">
                            <span className="order-title">Tipo de pagamento: </span>
                            <span className="order-text payment-type">{paymentType(order.paymentTypeEnum) ?? ""}</span>
                        </div>
                        <div className="order-prices">
                            <span>
                                <span className="order-title">Cupon: </span>
                                <span className="order-text">{order.couponCode}</span>
                            </span>
                            <span>
                                <span className="order-title">Desconto: </span>
                                <span className="order-text">R$ {order.discount}</span>
                            </span>
                            <span>
                                <span className="order-title">Frete: </span>
                                <span className="order-text">R$ {order.shipping}</span>
                            </span>
                        </div>
                    </div>
                    <div className="order-address">
                        <span>
                            <span className="order-title">CEP: </span>
                            <span className="order-text">{order.address.cep}</span>
                        </span>
                        <span>
                            <span className="order-title">Rua: </span>
                            <span className="order-text">{order.address.street}</span>
                        </span>
                        <span>
                            <span className="order-title">Número: </span>
                            <span className="order-text">{order.address.number}</span>
                        </span>
                        <span>
                            <span className="order-title">Bairro: </span>
                            <span className="order-text">{order.address.district}</span>
                        </span>
                        <span>
                            <span className="order-title">Cidade: </span>
                            <span className="order-text">{order.address.city}</span>
                        </span>
                        <span>
                            <span className="order-title">Estado: </span>
                            <span className="order-text">{order.address.state}</span>
                        </span>
                        <span>
                            <span className="order-title">País: </span>
                            <span className="order-text">{order.address.country}</span>
                        </span>
                        <span>
                            <span className="order-title">Complemento: </span>
                            <span className="order-text">{order.address.complement}</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}