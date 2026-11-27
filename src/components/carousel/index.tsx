import './style.css'
import '@/components/layout/style.css'
import { ProductCard } from '@/components/product-card';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from 'react';
import type { SimpleProductResponse } from '@/commons/product';

interface CarouselProps {
    products: SimpleProductResponse[];
    title: string;
}

export function Carousel({ products, title }: CarouselProps) {
    const carousel = useRef<HTMLDivElement>(null!);

    const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }

    const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    }

    return (
        <div>
            <h2 className='title'>{title}</h2>

            <div className='body'>
                <div className='buttons'>
                    <button onClick={handleLeftClick}><IoIosArrowBack /></button>
                </div>

                <div className="card">
                    <div className="carousel" ref={carousel}>
                        {products.map((p) => (
                            <ProductCard product={p} />
                        ))
                        }
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={handleRightClick}><IoIosArrowForward /></button>
                </div>
            </div>
        </div>
    )
}
