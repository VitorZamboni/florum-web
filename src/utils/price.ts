import type { SimpleProductResponse } from "@/commons/product";

export const FREE_SHIPPING_THRESHOLD = 499.99;

export const hasFreeShipping = (subtotal: number) => subtotal > FREE_SHIPPING_THRESHOLD;

export const getFinalPrice = (product: Pick<SimpleProductResponse, 'price' | 'discount'>) =>
    product.price * (1 - product.discount);