import type { ProductFilter, SimpleProductResponse } from "@/commons/product";
import { ProductService } from "@/services/product-service";
import { useEffect, useState } from "react";

interface CarouselProps {
    promotion: ProductFilter['promotion'],
}

export function useCarousel({ promotion }: CarouselProps) {
    const [products, setProducts] = useState<SimpleProductResponse[]>([]);

    useEffect(() => {
        async function loadProductsCarousel() {
            const response = await ProductService.getProductsPage(0, 9, { sort: 'RECENTS', text: '', promotion: promotion, categoryIds: [] });

            if (response.success && response.data) {
                setProducts(response.data.content);
            } else {
                console.error("Erro ao carregar produtos ", response.message);
            }
        }
        loadProductsCarousel();
    }, [promotion])

    return products;
}
