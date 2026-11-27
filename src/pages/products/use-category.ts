import { useEffect, useState } from "react";
import { CategoryService } from "@/services/category-service";
import type { CategoryResponse } from "@/commons/category";

export function useCategory() {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await CategoryService.getAllCategories();

                if (response.status == 200 && response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar produtos ", error);
            }
        }
        loadProducts();
    }, [])

    return categories;
}   
