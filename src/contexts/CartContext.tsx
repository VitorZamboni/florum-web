import { createContext, type ReactNode } from "react";
import { useCart } from "./hooks/use-cart";
import type { SimpleProductResponse } from "@/commons/product";
import type { Cart } from "@/commons/cart";

export interface CartContextType {
    productsCartCount: number;
    addProductCart: (product: SimpleProductResponse) => Promise<void>;
    handleUpdateQuantity: (productId: number, quantity: number, itemId: number) => Promise<void>;
    handleDeleteProduct: (productId: number, itemId: number) => Promise<void>;
    handleCompletePurchase: () => boolean;
    cart: Cart;
    resolveCart: () => Promise<void>;
    clearCart: () => void;
    handleKeepBuying: () => void;
    productTotal: number;
    total: number;
    discount: number;
    shipping: number;
    address: null;
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
