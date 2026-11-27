import { useEffect, useState } from "react";
import { CategoryService } from "@/services/category-service";
import type { CategoryResponse } from "@/commons/category";

export function useCategory() {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        async function loadCategories() {
            const response = await CategoryService.getAllCategories();

            if (response.success && response.data) {
                setCategories(response.data);
            } else {
                console.error("Erro ao carregar categorias ", response.message);
            }
        }
        loadCategories();
    }, [])

    return categories;
}   
