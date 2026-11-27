import { useEffect, useState } from "react";
import type { CreateOrderRequest, OrderResponse, SimpleOrderResponse } from "@/commons/order";
import OrderService from "@/services/order-service";

function useOrders() {
    const [orders, setOrders] = useState<SimpleOrderResponse[]>([]);

    useEffect(() => {
        async function loadOrders() {
            try {
                const response = await OrderService.getOrders();

                if (response.status == 200 && response.data) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar pedidos ", error);
            }
        }
        loadOrders();
    }, []);

    return orders;
}

function useOrder(id: number) {
    const [order, setOrder] = useState<OrderResponse>(null!);
    useEffect(() => {
        async function loadOrderById(id: number) {
            try {
                const response = await OrderService.getOrderById(id);

                if (response.status == 200 && response.data) {
                    setOrder(response.data);
                }
            } catch (error) {
                console.error("Erro ao achar pedido por id ", error);
            }
        }
        loadOrderById(id);
    }, [id])

    return order;
}

function useSaveOrder() {

    async function saveOrder(orderContent: CreateOrderRequest) {
        try {
            const response = await OrderService.postOrder(orderContent);

            if (response.status == 201 && response.data) {
                return response.data;
            }
        } catch (error) {
            console.error("Erro ao salvar pedido ", error);
        }
        return null;
    }

    return saveOrder;
}

const UseOrder = {
    useOrders,
    useOrder,
    useSaveOrder
}

export default UseOrder;