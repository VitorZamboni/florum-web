import { createContext, type ReactNode } from "react";
import { useToast } from "./hooks/use-toast";

export interface ToastContextType {
    message: string;
    type: 'success' | 'error';
    showToast: (message: string, type: 'success' | 'error') => void;
    show: boolean
}
// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext({} as ToastContextType);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const toast = useToast();
    return (
        <ToastContext.Provider value={toast}>
            {children}
        </ToastContext.Provider>
    );
}