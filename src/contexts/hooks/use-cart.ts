/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CartService from "@/services/cart-service";
import type { Cart } from "@/commons/cart";
import type { SimpleProductResponse } from "@/commons/product";

export function useCart() {
    const [productsCart, setProduct] = useState(null);
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
        const cart = await getProductsCart();
        if (cart) {
            const  _productTotal = cart.cartItems.reduce((t, i) => {
            if (i.product.discount) {
                return t + ((i.product.price / (1 - i.product.discount)) * i.quantity)
            } 
            return t + (i.product.price * i.quantity)
        }, 0);
        const _discount = cart.cartItems.reduce((t, i) => {
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
        // setProduct(cart);
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
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        setProductsCartCount(await getCartCount());
        showToast("Produto adicionado ao carrinho!", "success");
        loadProductsCart();
    }

    const handleUpdateQuantity = async (productId, quantity, cartItemId) => {
        await updateProductQuantity(productId, quantity, cartItemId);
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const handleDeleteProduct = async (productId) => {
        await removeProduct(productId);
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const resolveCart = async () => {
        await resolveCartService();
        setProductsCartCount(await getCartCount());
        loadProductsCart();
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        setProduct([]);
        setProductsCartCount(0);
        setProductTotal(0);
        setShipping(0);
        setDiscount(0);
        setTotal(0);
    }

    const handleAddressChange = (value) => {
        localStorage.setItem('address', JSON.stringify(value));
        setAddress(value);
    }

    const handleKeepBuying = () => {
        navigate('/products/Todos%20os%20Produtos')
    }

    const handleCompletePurchase = () => {
        if (productsCartCount <= 0) {
            showToast("Nenhum produto no carrinho", "error");
            return false;
        }
        if (!client) {
            showToast("Faça login para finalizar seu pedido", "error");
            return false;
        }
        const validAddress = address && address.street && address.district && address.number;
        if (!validAddress) {
            showToast("Insira um endereço válido", "error");
            return false;
        }
        return true;
    }

    const handleFinalizeOrder = async (paymentData) => {
        try {
            const order = await createOrder({
                address,
                paymentType: paymentData.paymentType,
                total,
                discount,
                shipping,
                items: productsCart,
            });
            if (!order) return false;
            await clearCartItems();
            clearCart();
            return true;
        } catch (error) {
            console.error('Erro ao finalizar pedido', error);
            return false;
        }
    }

    return {
        productsCart,
        productsCartCount,
        addProductCart,
        handleUpdateQuantity,
        handleDeleteProduct,
        resolveCart,
        clearCart,
        handleKeepBuying,
        handleCompletePurchase,
        handleFinalizeOrder,
        handleAddressChange,
        productTotal,
        total,
        discount,
        shipping,
        address
    };
}