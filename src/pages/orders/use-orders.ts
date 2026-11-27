import { useEffect, useState } from "react";
import type { SimpleOrderResponse } from "@/commons/order";
import { OrderService } from "@/services/order-service";

export function useOrders() {
    const [orders, setOrders] = useState<SimpleOrderResponse[]>([]);

    useEffect(() => {
        async function loadOrders() {
            const response = await OrderService.getOrders();

            if (response.success && response.data) {
                setOrders(response.data);
            } else {
                console.error("Erro ao carregar pedidos ", response.message);
            }
        }
        loadOrders();
    }, []);

    return orders;
}
