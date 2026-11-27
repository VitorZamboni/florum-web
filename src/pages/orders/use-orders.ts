import { useEffect, useState } from "react";
import type { SimpleOrderResponse } from "@/commons/order";
import { OrderService } from "@/services/order-service";

export function useOrders() {
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
