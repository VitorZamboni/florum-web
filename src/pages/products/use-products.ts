import { useEffect, useState } from "react";
import { ProductService } from "@/services/product-service";
import type { ProductFilter, SimpleProductResponse } from "@/commons/product";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
    const [products, setProducts] = useState<SimpleProductResponse[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? 0);
    const sort = (searchParams.get('sort') ?? 'RECENTS') as ProductFilter['sort'];
    const text = searchParams.get('text') ?? '';
    const promotion = searchParams.get('promotion') === "true";
    const categoryId = searchParams.get('categoryId');

    useEffect(() => {
        async function loadProducts() {
            const filter: ProductFilter = {
                text: text,
                promotion: promotion,
                categoryIds: categoryId ? [Number(categoryId)] : [],
                sort: sort
            };

            setLoading(true);
            const response = await ProductService.getProductsPage(page, 9, filter);
            if (response.success && response.data) {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            setLoading(false);
        }
        loadProducts();
    }, [page, sort, text, promotion, categoryId])

    return { products, totalPages, loading, page };
}
