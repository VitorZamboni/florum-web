import type { ProductFilter, SimpleProductResponse } from "@/commons/product";
import ProductService from "@/services/product-service";
import { useEffect, useState } from "react";

interface CarouselProps {
    promotion: ProductFilter['promotion'],
    categoryIds: ProductFilter['categoryIds']
}

export function useCarousel({ promotion, categoryIds }: CarouselProps) {
    const [products, setProducts] = useState<SimpleProductResponse[]>([]);

    useEffect(() => {
        async function loadProductsCarousel() {
            try {
                const response = await ProductService.getProductsPage(0, 9, { sort: 'RECENTS', text: '', promotion: promotion, categoryIds: categoryIds });

                if (response.status === 200 && response.data) {
                    setProducts(response.data.content);

                }
            } catch (error) {
                console.error("Erro ao carregar produtos ", error);
            }
        }
        loadProductsCarousel();
    }, [])

    return products;
}