import type {ProductPageResponse, ProductFilter, ProductDetailResponse } from "@/commons/product";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios";

const path = 'products';
const pathPage = path + '/page';
const getProductsPage = async (page: number, size: number = 10, filters: ProductFilter): Promise<IResponse<ProductPageResponse>>=> {
    return await api.get<ProductPageResponse>(pathPage, {page, size, ...filters});
} 

const getProductById = async (id: number): Promise<IResponse<ProductDetailResponse>> => {
    return await api.get<ProductDetailResponse>(`${path}/${id}`);
}

const ProductService = {
    getProductsPage,
    getProductById
}

export default ProductService;