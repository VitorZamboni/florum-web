import type { Validator } from "@/commons/types";
import { useState, type ReactNode } from "react";

export interface InputOptions {
    icon: ReactNode;
    placeholder?: string;
    type: string;
    name: string;
    label: string;
    changeValue: (value: string) => void;
    validators?: Validator[];
}

interface ErrorMessage {
    message: string;
    uid: string;
}

export function useInput() {
    const [visible, setVisible] = useState(false);
    const [error, setError]  = useState<ErrorMessage[]>([]);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const validate = async (value: string, fieldName: string, validators: Validator[]) => {        
        for (const validator of validators) {
            if (!(await validator.validate(value))) {
                const existsError = error.find(err => err.uid === validator.uid);
                if (!existsError) {                                        
                    setError((error) => [...error, { uid: validator.uid, message: `${fieldName} ${validator.message}` }]);                    
                }
            } else {
                setError((error) => error.filter(err => err.uid !== validator.uid));
            }
        }
        return error.length === 0;
    }

    return { visible, toggleVisibility, error, validate };
}