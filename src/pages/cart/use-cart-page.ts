import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
import { useCarousel } from "@/contexts/hooks/use-carousel";

export function useCartPage() {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const products = useCarousel({ promotion: true, categoryIds: [0] });
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const handleKeepBuying = () => {
        navigate('/products');
    }

    const handleCompletePurchase = () => {
        if (cart.cartItems.length === 0) {
            showToast("Seu carrinho está sem itens", "error");
            return;
        }
        if (!user) {
            showToast("Faça login para finalizar a compra", "error");
            navigate('/login');
            return;
        }
        setIsCheckoutOpen(true);
    }

    const handleClearCart = () => {
        if (window.confirm("Deseja remover todos os produtos do carrinho?")) {
            clearCart();
        }
    }

    return { products, isCheckoutOpen, setIsCheckoutOpen, handleKeepBuying, handleCompletePurchase, handleClearCart };
}