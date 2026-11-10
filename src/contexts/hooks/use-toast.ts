import { useState } from "react";

export function useToast() {
    const [message, setMessage] = useState("");
    const [type, setType] = useState<'success' | 'error'>("success");
    const [show, setShow] = useState(false);

    const showToast = (message: string, type: 'success' | 'error') => {        
        setMessage(message);
        setType(type);
        setShow(true);
        setTimeout(() => {
            setMessage("");
            setShow(false);
        }, 3000);
    };
    return { showToast, message, type, show };
}