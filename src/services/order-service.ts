import type { CreateOrderRequest, CreateOrderResponse, OrderResponse, SimpleOrderResponse } from "@/commons/order";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios";

const path = 'orders';

const getOrders = async (): Promise<IResponse<SimpleOrderResponse[]>> => {
    return await api.get<SimpleOrderResponse[]>(`${path}`);
}

const getOrderById = async (id: number): Promise<IResponse<OrderResponse>> => {
    return await api.get<OrderResponse>(`${path}/${id}`);
}

const postOrder = async (data: CreateOrderRequest): Promise<IResponse<CreateOrderResponse>> => {
    return await api.post(path, data);
}

const OrderService = {
    getOrders,
    getOrderById,
    postOrder
}

export default OrderService;