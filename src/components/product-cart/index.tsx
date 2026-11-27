import { useContext } from 'react';
import './style.css'
import '../layout/style.css'
import { FiTrash2 } from "react-icons/fi";
import type { CartItem } from '@/commons/cart';
import { CartContext } from '@/contexts/CartContext';
import { useProductCart } from './use-product-cart';
import { getFinalPrice } from '@/utils/price';
import { useNavigate } from 'react-router-dom';

export function ProductCart(item: CartItem) {
    const { product, quantity } = item;
    const { handleUpdateQuantity, handleDeleteProduct } = useContext(CartContext);
    const { handleDeleteClick, showPopoverDelete } = useProductCart();
    const navigate = useNavigate(); 

    return (
        <div className="product-cart" >
            <div onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.mainImageUrl} alt={product.name} />
            </div>

            <div className='container-info'>
                <div className="name">
                    <span onClick={() => navigate(`/product/${product.id}`)}>{product.name}</span>
                </div>

                <div className="quantity">
                    <div className="text-decoration cart-quantity">
                        <div className="quantity-control">
                            <button
                                className="quantity-button"
                                onClick={() => handleUpdateQuantity(item, quantity - 1)}
                                disabled={quantity <= 1}
                                aria-label="Diminuir quantidade"
                            >
                                -
                            </button>
                            <span className="quantity-value">{quantity}</span>
                            <button
                                className="quantity-button"
                                onClick={() => handleUpdateQuantity(item, quantity + 1)}
                                aria-label="Aumentar quantidade"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="delete-wrapper">
                        <button className='trash-button' onClick={() => handleDeleteClick()}><FiTrash2 className='trash' /></button>
                        {
                            showPopoverDelete &&
                            (
                                <div className="delete-confirm">
                                    <p className="delete-confirm-text">Remover produto?</p>
                                    <div className="delete-confirm-actions">
                                        <button className="delete-confirm-btn confirm" onClick={() => handleDeleteProduct(item)}>Sim</button>
                                        <button className="delete-confirm-btn cancel" onClick={() => handleDeleteClick()}>Cancelar</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="item-price">
                    <span className='price'>R$ {getFinalPrice(product).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}