import type { OrderStatus } from '@/commons/order';
import './style.css';
import '@/components/layout/style.css';
import { useOrders } from "./use-orders";
import { useState } from 'react';
import { ModalOrder } from '@/components/modal-order';

interface StatusPt {
    class: string;
    name: string;
}

function statusSpecs(pedidoStatus: OrderStatus): StatusPt {
    switch (pedidoStatus) {
        case 'PENDING':
            return { class: "blue", name: "Pendente" };
        case 'PAID':
            return { class: "blue", name: "Pago" };
        case 'SHIPPED':
            return { class: "yellow", name: "Enviado" };
        case 'DELIVERED':
            return { class: "green", name: "Entregue" };
        case 'CANCELED':
            return { class: "red", name: "Cancelado" };
        default:
            return { class: "red", name: "Erro ao processar o status do pedido" };
    }
};

export function OrdersPage() {
    const orders = useOrders();
    const [open, setOpen] = useState<number | null>(null);

    const handleButtonClick = (orderId: number) => {
        setOpen((open) => (open === orderId ? null : orderId));
    };

    return (
        <div className="container">
            <h2 className="title">Meus Pedidos</h2>
            {
                (orders.length <= 0) &&
                (
                    <div>
                        <p>Você ainda não fez nenhum pedido.</p>
                    </div>
                )
            }

            <div className="orders-list">
                {orders.map(order => {
                    const status = statusSpecs(order.status);
                    const isOpen = order.id === open;

                    return (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="status">
                                    <span className={`order-status`}>Status: </span>
                                    <span className={`order-status ${status.class}`}>{status.name}</span>
                                </div>
                                <div className="infos">
                                    <div>
                                        <span className="order-id"> Código do pedido: #{order.id}</span>
                                    </div>
                                    <div>
                                        <span className="order-purchased">Pedido realizado em: {new Date(order.purchasedOn).toLocaleDateString()}</span>

                                    </div>
                                    <div>
                                        <span className="order-total">Total: R$ {Number(order.total).toFixed(2)}</span>
                                    </div>
                                    <button className="order-see-more" onClick={() => handleButtonClick(order.id)}>{isOpen ? "Ver menos" : "Ver mais"}</button>
                                </div>
                            </div>
                            <ModalOrder isOpen={isOpen} orderId={order.id} />
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}
