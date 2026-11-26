import type { SimpleProductResponse } from "@/commons/product";

export const getFinalPrice = (product: Pick<SimpleProductResponse, 'price' | 'discount'>) =>
    product.price * (1 - product.discount);