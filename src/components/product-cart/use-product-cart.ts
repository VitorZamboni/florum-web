import { useState } from "react";

export function useProductCart() {
    const [showPopoverDelete, setShowPopoverDelete ] = useState(false);

    const handleDeleteClick = () => {
        setShowPopoverDelete(prev => !prev);
    }

    return { 
        handleDeleteClick,
        showPopoverDelete
    }
}