import { useContext, useEffect, useState } from "react";
import ProductService from "@/services/product-service";
// import { saveToHistory } from "@/services/HistoryService";
import { useParams } from "react-router-dom";
import type { ImageResponse, ProductDetailResponse } from "@/commons/product";
import { CartContext } from "../CartContext";

export function useProduct() {
    const { addProductCart } = useContext(CartContext);
    const [product, setProduct] = useState<ProductDetailResponse>();
    const [selectedImage, setSelectedImage] = useState<ImageResponse>();
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

    const handleAddToCart = () => {
        if (!product) return;
        addProductCart({
            id: product.id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            evaluation: product.evaluation,
            mainImageUrl: product.images[0]?.url,
        });
    };

    return { product, selectedImage, setSelectedImage, handleImageClick, handleAddToCart };
}