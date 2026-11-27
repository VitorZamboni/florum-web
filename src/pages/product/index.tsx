import './style.css'
import '@/components/layout/style.css'
import { MdAddShoppingCart } from "react-icons/md";
import { useProduct } from "./use-product";
import { FaRegCheckCircle, FaStar } from "react-icons/fa";
import { Carousel } from "@/components/carousel"
import { useCarousel } from "@/components/carousel/use-carousel";
import { FREE_SHIPPING_THRESHOLD, getFinalPrice, hasFreeShipping } from '@/utils/price';

export function ProductPage() {
    const { product, selectedImage, handleImageClick, handleAddToCart } = useProduct();
    const isPromotion:boolean = Number(product?.discount) > 0;
    const products = useCarousel({ promotion: false, categoryIds: [] });

    return (
        <>
            <div className="container product-container">
                <div className="product-image">
                    <img src={selectedImage?.url} alt={product?.name} />
                    <div className='images'>
                        {
                            product?.images.map(i => (
                                <img
                                    className={selectedImage?.url === i.url ? 'selected-image' : ''}
                                    src={i.url}
                                    alt={product?.name}
                                    onClick={() => handleImageClick(i)}
                                    key={i.url}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='product-info'>
                    <h2 className="title">{product?.name}</h2>
                    <div className='product-details '>
                        <div className='rating'>
                            <span>
                                {product?.evaluation.toFixed(1)} <FaStar className='rating-star' />
                            </span>

                        </div>
                        <div className='product-price'>
                            <div >
                                <span className='large-text'>R$ {product && getFinalPrice(product).toFixed(2)}</span>
                                {
                                    isPromotion &&
                                    (
                                        <>
                                            <span className='small-text old-price'>R$ {product?.price.toFixed(2)}</span>
                                            <span className='small-text'>({Math.round(Number(product?.discount) * 100)}% off)</span>
                                        </>
                                    )
                                }
                            </div>
                            <div className='line-2'>
                                <span className='span-text'> à vista ou em </span>
                                <span className='medium-text'> 12x </span>
                                <span className='span-text'> de </span>
                                <span className='medium-text'>R$ {product && ((getFinalPrice(product) * 1.5) / 12).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='product-shipping'>
                            <span className='small-text'>Frete: </span>
                            <span className='medium-text'>
                                {product && hasFreeShipping(getFinalPrice(product))
                                    ? 'Grátis'
                                    : `Grátis acima de R$ ${FREE_SHIPPING_THRESHOLD.toFixed(2)}`}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className='stock-text'>
                            <FaRegCheckCircle />
                            {product?.stock} disponíveis em estoque
                        </span>
                        <div className='product-buttons'>
                            <button className='button' 
                            onClick={handleAddToCart}
                                >
                                <MdAddShoppingCart />Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container product-description container-home'>
                <h2 className='title'>Descrição</h2>
                <p className='description-text'>
                    {product?.description}
                </p>
            </div>
            <div className='container container-home'>
                <Carousel products={products} title="Continue comprando" />
            </div>
        </>
    )
}