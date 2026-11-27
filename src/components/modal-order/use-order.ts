import { useEffect, useState } from "react";
import type { OrderResponse } from "@/commons/order";
import { OrderService } from "@/services/order-service";

export function useOrder(id: number) {
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
