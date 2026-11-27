import { useEffect, useState } from "react";
import ProductService from "@/services/product-service";
import type { ProductFilter, SimpleProductResponse } from "@/commons/product";
import { useSearchParams } from "react-router-dom";

export default function useProducts() {
    const [products, setProducts] = useState<SimpleProductResponse[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
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
            setLoading(true);
            const response = await ProductService.getProductsPage(page, 9, filter);
            if (response.success && response.data) {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            setLoading(false);
        }
        loadProducts();
    }, [searchParams])

    return { products, totalPages, loading, page };
}
