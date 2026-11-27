import type { Address } from "@/commons/address";
import type { ProductQuantity, SimpleProductResponse } from "./product";

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export type PaymentType = 'PIX' | 'CARTAOCREDITO' | 'CARTAODEBITO';

export interface OrderResponse {
    id: number;
    couponCode?: string;
    purchasedOn: Date;
    total: number;
    discount?: number;
    shipping: number;
    address: Address;
    orderStatus: OrderStatus;
    paymentTypeEnum: PaymentType;
    orderItems: OrderItemsResponse[];
}

export interface OrderItemsResponse {
    id: number;
    quantity: number;
    price: number;
    product: SimpleProductResponse;
}

export interface SimpleOrderResponse {
    id: number;
    purchasedOn: Date;
    total: number;
    status: OrderStatus;
}

export interface CreateOrderRequest {
    addressId: number;
    paymentType: PaymentType;
    couponCode?: string;
    items: ProductQuantity[];
}

export interface CreateOrderResponse {
    id: number;
}