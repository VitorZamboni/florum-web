import "./style.css";
import { useContext } from "react";
import { ToastContext, type ToastContextType } from "@/contexts/ToastContext";

export function Toast() {
    const { message, type, show }: ToastContextType = useContext(ToastContext);
    return (
        <>
            {
                show && 
                (
                    <div className={`toast ${type}`}>
                        {message}
                    </div>
                )
            }
        </>
    );
}