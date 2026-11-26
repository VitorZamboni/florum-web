import { FaStar } from 'react-icons/fa';
import './style.css'
import '@/components/layout/style.css'
import { MdAddShoppingCart } from "react-icons/md";
import type { SimpleProductResponse } from '@/commons/product';
import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';
import { getFinalPrice } from '@/utils/price';

interface ProductCardProps{
    product : SimpleProductResponse;
}

export default function ProductCard({product} : ProductCardProps){    
    const { addProductCart } = useContext(CartContext);
    const isPromotion = product.discount > 0;

    return(
        <div className="product" onClick={() => window.location.href = `/product/${product.id}`}>
            <div className="image">
                <img src={product.mainImageUrl} alt={product.name} />
                {
                    isPromotion && 
                    (
                        <div className='discount-span'>
                            <span>
                                {(product.discount * 100).toFixed()}% off
                            </span>
                        </div>
                    )
                }
            </div>
            <div className='container-name'>
                <span className='name'>{product.name}</span>
                <span className='rating'>{product.evaluation} <FaStar className='rating-star'/></span>
            </div>
            <div className='container-info'>
                <div className="info">  
                    <div>
                        <span>R$ {getFinalPrice(product).toFixed(2)} </span>
                                {
                                    isPromotion &&
                                    (
                                        <span className='old-price'>R$ {product.price.toFixed(2)}</span>
                                    )
                                }
                    </div>
                    <div className='installment'>
                        <span>ou </span>
                        <span className='installment-values'>12X </span>
                        <span>de </span>
                        <span className='installment-values'>R$ {((getFinalPrice(product) * 1.5) / 12).toFixed(2)}</span>
                    </div>
                </div>
                <div className='cart-button'>
                    <button className='button product-button'
                     onClick={(e) => {
                        e.stopPropagation();
                        addProductCart(product);
                    }}
                    >
                        <MdAddShoppingCart className='addButton'/>
                    </button>
                </div>
            </div>
            
        </div>
    )
}