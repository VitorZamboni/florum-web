import Carousel from "@/components/carousel";
import ProductCart from "@/components/product-cart";
import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import './style.css'
import '@/components/layout/style.css'
import { useCartPage } from "./use-cart-page";
import { hasFreeShipping } from "@/utils/price";

export function Cart() {
    const { cart, productsCartCount, productTotal, discount, total } = useContext(CartContext);
    const { products, handleKeepBuying, handleCompletePurchase, handleClearCart } = useCartPage();
    const title = "Você também vai gostar";

    return (
        <>
            <div className='cart'>
                <div className='cart-products card'>
                    <div className='products'>
                        {
                            cart.cartItems.length > 0 ?
                                cart.cartItems.map((item) => (
                                    <ProductCart key={item.id} {...item} />
                                ))
                            :
                                <div>
                                    Nenhum produto no carrinho
                                </div>
                        }
                        
                    </div>
                </div>

                <div className='infos '>
                    <div className="details card">
                        <div>
                            <h4 className='details-name'>Produtos ({productsCartCount})</h4>
                            <h4 className='details-name'>Frete</h4>
                            <h4 className='details-name'>Descontos</h4>
                            <h4 className='details-total'>Total</h4>
                        </div>
                        <div>
                            <h4 className='details-value'>R$ {productTotal.toFixed(2)}</h4>
                            <h4 className='details-value'>{hasFreeShipping(total) ? 'Grátis' : 'Calculado na finalização'}</h4>
                            <h4 className='details-value'>R$ {discount.toFixed(2)}</h4>
                            <h4 className='details-price'>R$ {total.toFixed(2)}</h4>
                        </div>
                    </div>

                    <div>
                        <button className='button finish' onClick={() => handleCompletePurchase()}>Finalizar Compra</button>
                        <button className='button continue' onClick={() => handleKeepBuying()}>Continuar Comprando</button>
                        {cart.cartItems.length > 0 && (
                            <button className='button continue' onClick={handleClearCart}>Esvaziar carrinho</button>
                        )}
                    </div>
                </div>
            </div>


            <div className='container container-home'>
                <Carousel products={products} title={title} />
            </div>
        </>

    );
}
