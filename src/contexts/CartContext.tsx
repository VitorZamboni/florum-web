import { createContext, type ReactNode } from "react";
import { useCart } from "./hooks/use-cart";
import type { SimpleProductResponse } from "@/commons/product";
import type { Cart, CartItem } from "@/commons/cart";

export interface CartContextType {
    productsCartCount: number;
    addProductCart: (product: SimpleProductResponse) => Promise<void>;
    handleUpdateQuantity: (item: CartItem, quantity: number) => Promise<void>;
    handleDeleteProduct: (item: CartItem) => Promise<void>;
    cart: Cart;
    clearCart: () => Promise<void>;
    reloadCart: () => Promise<void>;
    productTotal: number;
    total: number;
    discount: number;
}
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({} as CartContextType);

interface CartProviderProps {
  children: ReactNode;
}
export function CartProvider({ children }: CartProviderProps) {
    const cart = useCart(); 
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
}
