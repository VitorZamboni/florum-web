import type { CategoryResponse } from "./category";

export interface ProductFilter {
    text: string;
    promotion: boolean;
    categoryIds: number[];
    sort: 'RECENTS' | 'PRICE_ASC' | 'PRICE_DESC';
}

export interface ProductPageResponse {
    content: SimpleProductResponse[];
}

export interface SimpleProductResponse {
    id: number;
    name: string;
    price: number;
    discount: number;
    evaluation: number;
    mainImageUrl: string;
}

export interface ProductDetailResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    views: number;
    images: ImageResponse [];
    evaluation: number;
    createdOn: string;
    categories: CategoryResponse[];
}

interface ImageResponse {
    url: string;
    sortIndex: number;
}