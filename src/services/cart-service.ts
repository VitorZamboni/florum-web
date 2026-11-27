import type { Cart, CreateCart, UpdateCartItem } from "@/commons/cart";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios";

const path = 'carts'

const createCart = async (data: CreateCart): Promise<IResponse<void>> => {
    return api.post(path, data);
}

const get = async (): Promise<IResponse<Cart>> => {
    return api.get<Cart>(`${path}`);
}

const updateItem = async (itemId: number, data: UpdateCartItem): Promise<IResponse<void>> => {
    return api.put(`${path}/cartItem/${itemId}`, data);
}

const deleteItem = async (itemId: number): Promise<IResponse<void>> => {
    return api.del(`${path}/cartItem/${itemId}`);
}

export const CartService = {
    createCart,
    get,
    updateItem,
    deleteItem
}
