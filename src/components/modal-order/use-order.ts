import { useEffect, useState } from "react";
import type { OrderResponse } from "@/commons/order";
import { OrderService } from "@/services/order-service";

export function useOrder(id: number) {
    const [order, setOrder] = useState<OrderResponse>(null!);
    useEffect(() => {
        async function loadOrderById(id: number) {
            const response = await OrderService.getOrderById(id);

            if (response.success && response.data) {
                setOrder(response.data);
            } else {
                console.error("Erro ao achar pedido por id ", response.message);
            }
        }
        loadOrderById(id);
    }, [id])

    return order;
}
