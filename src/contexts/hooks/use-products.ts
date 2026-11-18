import { useEffect, useState } from "react";
import ProductService from "@/services/product-service";
import type { ProductFilter, SimpleProductResponse } from "@/commons/product";
import { useSearchParams } from "react-router-dom";

export default function useProducts() {
    const [products, setProducts] = useState<SimpleProductResponse[]>([]);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? 0);
    const sort = (searchParams.get('sort') ?? 'RECENTS') as ProductFilter['sort'];
    const text = searchParams.get('text') ?? '';
    const promotion = searchParams.get('promotion') === "true";
    const categoryId = searchParams.get('categoryId');

    const filter: ProductFilter = {
        text: text,
        promotion: promotion,
        categoryIds: categoryId ? [Number(categoryId)] : [],
        sort: sort
    };

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await ProductService.getProductsPage(page, 10, filter);

                if (response.status == 200 && response.data) {
                    setProducts(response.data.content);
                }
            } catch (error) {
                console.error("Erro ao carregar produtos ", error);
            }
        }
        loadProducts();
    }, [searchParams])

    return products;
}
