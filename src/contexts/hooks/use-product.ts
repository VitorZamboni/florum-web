import { useEffect, useState } from "react";
import ProductService from "@/services/product-service";
// import { saveToHistory } from "@/services/HistoryService";
import { useParams } from "react-router-dom";
import type { ImageResponse, ProductDetailResponse } from "@/commons/product";

export function useProduct() {
    const [product, setProduct] = useState<ProductDetailResponse | undefined>(null!);
    const [selectedImage, setSelectedImage] = useState<ImageResponse | undefined>(null!);
    const { id } = useParams();
    const idNumber:number =  Number(id);
    
    useEffect(() => {
        ProductService.getProductById(idNumber)
            .then(data => {
                setProduct(data.data);
                setSelectedImage(data.data?.images[0]);
                // saveToHistory(data.id);
            })
            .catch(error => console.error("Erro ao carregar produto: ", error));
    }, [id]);

    const handleImageClick = (image: ImageResponse) => {
        setSelectedImage(image);
    };

    return { product, selectedImage, setSelectedImage, handleImageClick };
}