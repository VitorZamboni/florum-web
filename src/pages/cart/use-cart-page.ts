import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/contexts/CartContext";
import { ToastContext } from "@/contexts/ToastContext";
import { useCarousel } from "@/components/carousel/use-carousel";

export function useCartPage() {
    const { cart, clearCart } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const products = useCarousel({ promotion: true, categoryIds: [] });

    const handleKeepBuying = () => {
        navigate('/products');
    }

    const handleCompletePurchase = () => {
        if (cart.cartItems.length === 0) {
            showToast("Seu carrinho está sem itens", "error");
            return;
        }
        navigate('/checkout');
    }

    const handleClearCart = () => {
        if (window.confirm("Deseja remover todos os produtos do carrinho?")) {
            clearCart();
        }
    }

    return { products, handleKeepBuying, handleCompletePurchase, handleClearCart };
}
