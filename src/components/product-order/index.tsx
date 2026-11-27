import './style.css'
import '@/components/layout/style.css'
import type { OrderItemsResponse } from '@/commons/order';

interface ProductOrderProps {
    item: OrderItemsResponse;
}

export function ProductOrder({ item }: ProductOrderProps) {

    return (
        <div className="product-order" onClick={() => window.location.href = `/product/${item.id}`}>
            <div className="image-order">
                <img src={item.product.mainImageUrl} alt={item.product.name} />
            </div>

            <div className='infos-order'>
                <span className='name'>{item.product.name}</span>
                <div className='infos-product-order'>
                    <span className='product-order-title'>Quantidade: </span>
                    <span>{item.quantity}</span>
                </div>
                <div className='infos-product-order'>
                    <span className='product-order-title'>Preço por produto: </span>
                    <span>R$ {item.price}</span>
                </div>
                <div className='infos-product-order'>
                    <span className='product-order-title'>Preço total do produto: </span>
                    <span>R$ {item.price * item.quantity}</span>
                </div>
            </div>
        </div>
    )
}