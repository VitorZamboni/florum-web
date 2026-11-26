/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { AuthContext } from "@/contexts/AuthContext";
import CartService from "@/services/cart-service";
import type { Cart, CartItem } from "@/commons/cart";
import type { SimpleProductResponse } from "@/commons/product";
import { getFinalPrice } from "@/utils/price";

const CART_STORAGE_KEY = 'cart';
const emptyCart = (): Cart => ({ cartItems: [] });

export function useCart() {
    const [cart, setCart] = useState<Cart>({ cartItems: [] }); 
    const { showToast } = useContext(ToastContext);
    const { user } = useContext(AuthContext);

    const productsCartCount = cart.cartItems.reduce((t, i) => t + i.quantity, 0);
    const productTotal = cart.cartItems.reduce((t, i) => t + i.product.price * i.quantity, 0);
    const discount = cart.cartItems.reduce((t, i) => t + (i.product.price - getFinalPrice(i.product)) * i.quantity, 0);
    const total = productTotal - discount;

    const getCartFromStorage = (): Cart => {
        const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || 'null');
        return stored?.cartItems ? stored : emptyCart();
    }

    const setCartToStorage = (cart: Cart) => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }

    const getCartFromServer = async (): Promise<Cart> => {
        const response = await CartService.get();
        return response.data?.cartItems ? response.data : emptyCart(); // body vazio = sem carrinho
    }

    const getProductsCart = async (): Promise<Cart> => {
        return user ? getCartFromServer() : getCartFromStorage();
    }

    const loadProductsCart = async () => {
        setCart(await getProductsCart());
    }

    const mergeStorageCart = async () => {
        const storedCart = getCartFromStorage();
        if (storedCart.cartItems.length === 0) return;

        localStorage.removeItem(CART_STORAGE_KEY);
        const items = storedCart.cartItems.map(i => ({ productId: i.product.id, quantity: i.quantity }));
        const response = await CartService.createCart({ items });
        if (!response.success) {
            setCartToStorage(storedCart);
        }
    }

    useEffect(() => {
        const syncCart = async () => {
            if (user) await mergeStorageCart();
            await loadProductsCart();
        };
        syncCart();
    }, [user]);

    const addProductCart = async (product: SimpleProductResponse) => {
        if (user) {
            const response = await CartService.createCart({ items: [{ productId: product.id, quantity: 1 }] });
            if (!response.success) {
                showToast("Não foi possível adicionar o produto ao carrinho", "error");
                return;
            }
        } else {
            const cart = getCartFromStorage();
            const existingItem = cart.cartItems.find(i => i.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.cartItems.push({ id: product.id, product, quantity: 1 }); // visitante: usa o id do produto
            }
            setCartToStorage(cart);
        }
        showToast("Produto adicionado ao carrinho!", "success");
        await loadProductsCart();
    }

    const handleUpdateQuantity = async (item: CartItem, quantity: number) => {
        if (user) {
            const response = await CartService.updateItem(item.id, { quantity });
            if (!response.success) {
                showToast("Não foi possível atualizar a quantidade", "error");
                return;
            }
        } else {
            const cart = getCartFromStorage();
            const storedItem = cart.cartItems.find(i => i.product.id === item.product.id);
            if (storedItem) {
                storedItem.quantity = quantity;
                setCartToStorage(cart);
            }
        }
        await loadProductsCart();
    }

    const handleDeleteProduct = async (item: CartItem) => {
        if (user) {
            const response = await CartService.deleteItem(item.id);
            if (!response.success) {
                showToast("Não foi possível remover o produto", "error");
                return;
            }
        } else {
            const cart = getCartFromStorage();
            cart.cartItems = cart.cartItems.filter(i => i.product.id !== item.product.id);
            setCartToStorage(cart);
        }
        await loadProductsCart();
    }

    const clearCart = async () => {
        if (user) {
            const responses = await Promise.all(
                cart.cartItems.map(item => CartService.deleteItem(item.id))
            );
            if (responses.some(r => !r.success)) {
                showToast("Não foi possível esvaziar o carrinho", "error");
            }
        } else {
            localStorage.removeItem(CART_STORAGE_KEY);   // aqui ainda estava 'cart' fixo
        }
        await loadProductsCart();
    }

    return {
        cart,
        productsCartCount,
        addProductCart,
        handleUpdateQuantity,
        handleDeleteProduct,
        clearCart,
        productTotal,
        total,
        discount,
    };
}