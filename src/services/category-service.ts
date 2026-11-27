import type { CategoryResponse } from "@/commons/category";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios";

const path = 'categories';

const getAllCategories = async (): Promise<IResponse<CategoryResponse[]>> => {
    return api.get<CategoryResponse[]>(path);
}

export const CategoryService = {
    getAllCategories
}
