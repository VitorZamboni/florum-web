/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CartService from "@/services/cart-service";
import type { Cart } from "@/commons/cart";
import type { SimpleProductResponse } from "@/commons/product";

export function useCart() {
    const [cart, setCart] = useState({} as Cart);
    const [productsCartCount, setProductsCartCount] = useState(0);
    const { showToast } = useContext(ToastContext);
    const { user } = useContext(AuthContext);
    const [productTotal, setProductTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState(null);

    const navigate = useNavigate();

    const getCartFromStorage = () => {
        return JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
    }

    const setCartToStorage = (cart: Cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const getProductsCart = async () => {
        if (user) {
            return (await CartService.get()).data;
        } else {
            getCartFromStorage();
        }
    }

    const getCartCount = async () => {
        if (user) {
            return (await CartService.count()).data?.count ?? 0;
        } else {
            const cart = getCartFromStorage();
            if (!cart) return 0
            return cart.cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }

    const loadProductsCart = async () => {
        const _cart = await getProductsCart();
        if (_cart) {
            const  _productTotal = _cart.cartItems.reduce((t, i) => {
            if (i.product.discount) {
                return t + ((i.product.price / (1 - i.product.discount)) * i.quantity)
            } 
            return t + (i.product.price * i.quantity)
        }, 0);
        const _discount = _cart.cartItems.reduce((t, i) => {
            if (i.product.discount) {
                return t + (((i.product.price / (1 - i.product.discount)) * i.quantity) - (i.product.price * i.quantity))
            }
            return t + 0
        }, 0)
        const _shipping = _productTotal - _discount > 199.99 ? 0 : 23.96;
        const _total = (_productTotal - _discount) + _shipping;
        setDiscount(_discount);
        setProductTotal(_productTotal);
        setShipping(_shipping);
        setTotal(_total);
        setCart(_cart);
        setProductsCartCount((await CartService.count()).data?.count ?? 0);
        }
        
        setAddress(JSON.parse(localStorage.getItem('address') || '{}'));
    }

    useEffect(() => {
        loadProductsCart();
    }, []);

    const addProductCart = async (product: SimpleProductResponse) => {
        if (user) {
            await CartService.createCart({items:[{productId: product.id, quantity: 1}]});
        } else {
            const cart = getCartFromStorage();
            const existingProduct = cart.cartItems.find(item => item.product.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.cartItems.push({ product: product, quantity: 1, id: 0 });
            }
            setCartToStorage(cart);
        }
        setProductsCartCount(await getCartCount());
        showToast("Produto adicionado ao carrinho!", "success");
        loadProductsCart();
    }

    const handleUpdateQuantity = async (productId: number, quantity: number, itemId: number) => {
        if (user) {
            await CartService.updateItem(itemId, {quantity});
        } else {
            const cart = getCartFromStorage();
            const item = cart.cartItems.find(i => i.product.id === productId);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const handleDeleteProduct = async (productId: number, itemId: number) => {
        if (user) {
            CartService.deleteItem(itemId);
        } else {
            const cart = getCartFromStorage();
            cart.cartItems = cart.cartItems.filter(i => i.product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const resolveCart = async () => {
        const storedCart = getCartFromStorage();
        if (storedCart.cartItems) {
            const items = storedCart.cartItems.map(i => ({productId: i.product.id, quantity: i.quantity }));
            await CartService.createCart({items});
        }
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart({});
        setProductsCartCount(0);
        setProductTotal(0);
        setShipping(0);
        setDiscount(0);
        setTotal(0);
    }

    // const handleAddressChange = (value) => {
    //     localStorage.setItem('address', JSON.stringify(value));
    //     setAddress(value);
    // }

    const handleKeepBuying = () => {
        navigate('/products/Todos%20os%20Produtos')
    }

    const handleCompletePurchase = () => {
        
        return true;
    }

    // const handleFinalizeOrder = async (paymentData) => {
    //     try {
    //         const order = await createOrder({
    //             address,
    //             paymentType: paymentData.paymentType,
    //             total,
    //             discount,
    //             shipping,
    //             items: productsCart,
    //         });
    //         if (!order) return false;
    //         await clearCartItems();
    //         clearCart();
    //         return true;
    //     } catch (error) {
    //         console.error('Erro ao finalizar pedido', error);
    //         return false;
    //     }
    // }

    return {
        cart,
        productsCartCount,
        addProductCart,
        handleUpdateQuantity,
        handleDeleteProduct,
        resolveCart,
        clearCart,
        handleKeepBuying,
        handleCompletePurchase,
        // handleFinalizeOrder,
        // handleAddressChange,
        productTotal,
        total,
        discount,
        shipping,
        address
    };
}