import type { ProductQuantity, SimpleProductResponse } from "./product";

export interface CreateCart {
    items: ProductQuantity[]
}

export interface CartCount {
    count: number
}
export interface Cart {
    cartItems: CartItem[]; 
}

export interface CartItem {
    id: number;
    quantity: number;
    product: SimpleProductResponse;
}

export interface UpdateCartItem {
    quantity: number; 
}