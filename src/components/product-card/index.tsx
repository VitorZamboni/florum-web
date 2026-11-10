import { FaStar } from 'react-icons/fa';
import '../styles/productCard.css'
import '../styles/style.css'
import { MdAddShoppingCart } from "react-icons/md";
import { useContext } from 'react';

export default function ProductCard({product}){    
    const { addProductCart } = useContext(CartContext);
    const isPromotion = product.classes.some(c => c === 'Promoções');

    return(
        <div className="product" onClick={() => window.location.href = `/product/${product.id}`}>
            <div className="image">
                <img src={product.images[0].url} alt={product.name} />
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
                <span className='rating'>{product.rating} <FaStar className='rating-star'/></span>
            </div>
            <div className='container-info'>
                <div className="info">  
                    <div>
                        <span>R$ {product.price} </span>
                        {
                            isPromotion && 
                            (
                                <span className='old-price'>R$ {(product.price / (1 - product.discount)).toFixed(2)}</span>
                            )
                        }
                    </div>
                    <div className='installment'>
                        <span>ou </span>
                        <span className='installment-values'>12X </span>
                        <span>de </span>
                        <span className='installment-values'>R$ {((product?.price * 1.5) / 12).toFixed(2)}</span>
                    </div>
                </div>
                <div className='cart-button'>
                    <button className='button product-button' onClick={(e) => {
                        e.stopPropagation();
                        addProductCart(product);
                    }}>
                        <MdAddShoppingCart className='addButton'/>
                    </button>
                </div>
            </div>
            
        </div>
    )
}