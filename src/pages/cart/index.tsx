import Carousel from "@/components/carousel";
import ProductCart from "@/components/product-cart";
import { CartContext } from "@/contexts/CartContext";
import { useCarousel } from "@/contexts/hooks/use-carousel";
import { useContext, useState } from "react";
import './style.css'
import { GoPlus } from "react-icons/go";


export function Cart() {
    const products = useCarousel({promotion: true, categoryIds: [0]});
    const {
        handleCompletePurchase,
        cart,
        productsCartCount,
        productTotal,
        total,
        discount,
        shipping,
        handleKeepBuying,
        address,
    } = useContext(CartContext);

    const title = "Você também vai gostar";
    const [openModal, setOpenModal] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <>
            <div className='cart'>
                <div className='cart-products card'>
                    <div className='products'>
                        {
                            cart && cart.cartItems?.length > 0 ?
                                cart.cartItems?.map((p) => (
                                    <ProductCart {...p} />
                                ))
                            :
                                <div>
                                    Nenhum produto no carrinho
                                </div>
                        }
                        
                    </div>
                </div>

                <div className='infos '>
                    <div className="address card">
                        <h4>Endereço de entrega: </h4>
                        <span>
                            {/* Rua {address?.street}, Bairro {address?.district} - N° {address?.number} */}
                        </span>
                        <button onClick={() => setOpenModal(true)}>Alterar</button>
                        {/* <ModalCart 
                            isOpen={openModal} 
                            setModalOpen={() => setOpenModal(!openModal)} setAddressModal={(e) => handleAddressChange(e)} 
                            address={address}
                        /> */}
                    </div>

                    <div className="discount  card">
                        <h4>Código de desconto:</h4>
                        <div className='discountBar'>
                            {/* <InputBar icon={GoPlus} /> */}
                        </div>
                    </div>

                    <div className="details card">
                        <div>
                            <h4 className='details-name'>Produtos ({productsCartCount})</h4>
                            <h4 className='details-name'>Frete</h4>
                            <h4 className='details-name'>Descontos</h4>
                            <h4 className='details-total'>Total</h4>
                        </div>
                        <div>
                            <h4 className='details-value'>R$ {productTotal?.toFixed(2) ?? 0}</h4>
                            <h4 className='details-value'>R$ {shipping?.toFixed(2) ?? 0}</h4>
                            <h4 className='details-value'>R$ {discount?.toFixed(2) ?? 0}</h4>
                            <h4 className='details-price'>R$ {total?.toFixed(2) ?? 0}</h4>
                        </div>
                    </div>

                    <div>
                        <button className='button finish' onClick={() => { if (handleCompletePurchase()) setIsCheckoutOpen(true); }}>Finalizar Compra</button>
                        <button className='button continue' onClick={() => handleKeepBuying()}>Continuar Comprando</button>
                    </div>

                    {/* <ModalCheckout
                        isOpen={isCheckoutOpen}
                        onClose={() => setIsCheckoutOpen(false)}
                        onFinalize={handleFinalizeOrder}
                    /> */}
                </div>
            </div>


            <div className='container container-home'>
                <Carousel products={products} title={title} />
            </div>
        </>

    );
}
